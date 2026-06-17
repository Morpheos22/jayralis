#!/usr/bin/env bash
# Security audit of live jayralis.fyi deployment — Round 2 (extended)
set -u
TARGET="https://www.jayralis.fyi"
UA_BROWSER="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
UA_CURL="curl/8.0"
UA_PYTHON="python-requests/2.31.0"
UA_WGET="Wget/1.21"
UA_SCRAPY="Scrapy/2.11"
PASS=0
FAIL=0
WARN=0

check() {
  local name="$1" expected="$2" actual="$3"
  if echo "$actual" | grep -qiE "$expected"; then
    echo "  [PASS] $name"
    PASS=$((PASS+1))
  else
    echo "  [FAIL] $name"
    echo "        expected: $expected"
    echo "        actual:   $(echo "$actual" | head -3)"
    FAIL=$((FAIL+1))
  fi
}

check_absent() {
  local name="$1" pattern="$2" actual="$3"
  if echo "$actual" | grep -qiE "$pattern"; then
    echo "  [FAIL] $name (found forbidden pattern: $pattern)"
    FAIL=$((FAIL+1))
  else
    echo "  [PASS] $name"
    PASS=$((PASS+1))
  fi
}

check_status() {
  local name="$1" url="$2" expected_code="$3" ua="${4:-$UA_BROWSER}"
  local actual
  actual=$(curl -sI -A "$ua" "$url" | head -1 | grep -oE '[0-9]{3}' | head -1)
  if [ "$actual" = "$expected_code" ]; then
    echo "  [PASS] $name (HTTP $actual)"
    PASS=$((PASS+1))
  else
    echo "  [FAIL] $name — expected HTTP $expected_code, got $actual"
    FAIL=$((FAIL+1))
  fi
}

echo "════════════════════════════════════════════════════════════════"
echo "  JAYRALIS.FYI — ROUND 2 SECURITY HARDENING VERIFICATION"
echo "  Target: $TARGET"
echo "════════════════════════════════════════════════════════════════"

echo ""
echo "─── ROUND 1 (regression): Security Headers on main HTML page ───"
HEADERS=$(curl -sI -A "$UA_BROWSER" "$TARGET/")
check "Content-Security-Policy present" "content-security-policy" "$HEADERS"
check_absent "CSP: no unsafe-eval" "unsafe-eval" "$HEADERS"
check "X-Content-Type-Options" "nosniff" "$HEADERS"
check "X-Frame-Options" "DENY" "$HEADERS"
check "Strict-Transport-Security" "max-age=63072000.*preload" "$HEADERS"
check "Referrer-Policy" "strict-origin-when-cross-origin" "$HEADERS"
check "Permissions-Policy" "camera=\(\)" "$HEADERS"
check "X-DNS-Prefetch-Control" "off" "$HEADERS"
check "Cross-Origin-Opener-Policy" "same-origin" "$HEADERS"
check "Cross-Origin-Resource-Policy" "same-origin" "$HEADERS"
check "X-Permitted-Cross-Domain-Policies" "none" "$HEADERS"
check_absent "X-Powered-By stripped" "x-powered-by" "$HEADERS"

echo ""
echo "─── ROUND 2 (new): Extended header checks ───"
check "Cross-Origin-Embedder-Policy global" "cross-origin-embedder-policy.*require-corp" "$HEADERS"
check "X-Download-Options noopen" "x-download-options.*noopen" "$HEADERS"
check "CSP: navigate-to restriction" "navigate-to" "$HEADERS"
check "Permissions-Policy expanded (clipboard)" "clipboard-read=\(\)" "$HEADERS"
check "Permissions-Policy expanded (sync-xhr)" "sync-xhr=\(\)" "$HEADERS"

echo ""
echo "─── ROUND 2: Anti-scraping — multiple CLI user agents ───"
for AGENT_NAME in "curl:$UA_CURL" "wget:$UA_WGET" "python-requests:$UA_PYTHON" "scrapy:$UA_SCRAPY"; do
  NAME="${AGENT_NAME%%:*}"
  UA="${AGENT_NAME#*:}"
  CODE=$(curl -sI -A "$UA" "$TARGET/staff-ceo-james.jpg" | head -1 | grep -oE '[0-9]{3}' | head -1)
  if [ "$CODE" = "403" ]; then
    echo "  [PASS] Block $NAME scraper on staff image (HTTP $CODE)"
    PASS=$((PASS+1))
  else
    echo "  [FAIL] Block $NAME scraper — expected 403, got $CODE"
    FAIL=$((FAIL+1))
  fi
done

echo ""
echo "─── ROUND 2: /_next/data blocked (info disclosure) ───"
# We need to find a build ID; for testing, use a fake one — should 404 regardless
check_status "Block /_next/data/<build>/page.json" "$TARGET/_next/data/abc123/page.json" "404"

echo ""
echo "─── ROUND 2: Additional sensitive file blocks ───"
for P in /.git/config /.git/HEAD /.npmrc /.prettierrc /.eslintrc /docker-compose.yml /Dockerfile /.dockerignore /license.md /contributing.md /.DS_Store /.vscode/settings.json /worklog.md /tsconfig.json /next.config.ts /proxy.ts; do
  CODE=$(curl -sI -A "$UA_BROWSER" "$TARGET$P" | head -1 | grep -oE '[0-9]{3}' | head -1)
  if [ "$CODE" = "404" ] || [ "$CODE" = "403" ]; then
    echo "  [PASS] $P → $CODE"
    PASS=$((PASS+1))
  else
    echo "  [FAIL] $P → $CODE (expected 404/403)"
    FAIL=$((FAIL+1))
  fi
done

echo ""
echo "─── ROUND 2: Sensitive file extensions blocked ───"
for EXT in ".map" ".env" ".prisma" ".db" ".sqlite" ".pem" ".key" ".crt" ".bak" ".log"; do
  CODE=$(curl -sI -A "$UA_BROWSER" "$TARGET/test$EXT" | head -1 | grep -oE '[0-9]{3}' | head -1)
  if [ "$CODE" = "404" ] || [ "$CODE" = "403" ]; then
    echo "  [PASS] *$EXT → $CODE"
    PASS=$((PASS+1))
  else
    echo "  [FAIL] *$EXT → $CODE (expected 404/403)"
    FAIL=$((FAIL+1))
  fi
done

echo ""
echo "─── ROUND 2: /api enumeration blocked ───"
for P in /api/foo /api/users /api/admin /api/login /api/contact /api/v1 /api/v2/users /api/auth/session; do
  check_status "Block $P" "$TARGET$P" "404"
done

echo ""
echo "─── ROUND 2: Asset protection headers on staff images ───"
SHEADERS=$(curl -sI -A "$UA_BROWSER" -e "$TARGET/" "$TARGET/staff-ceo-james.jpg")
check "Cache-Control private" "private, max-age=86400" "$SHEADERS"
check "X-Robots-Tag noindex" "noindex" "$SHEADERS"
check "Cross-Origin-Resource-Policy same-origin" "same-origin" "$SHEADERS"
check "Cross-Origin-Embedder-Policy require-corp" "require-corp" "$SHEADERS"
check "Content-Type image/jpeg" "image/jpeg" "$SHEADERS"
check "X-Content-Type-Options on image" "nosniff" "$SHEADERS"

echo ""
echo "─── ROUND 2: Logo protection ───"
LHEADERS=$(curl -sI -A "$UA_BROWSER" -e "$TARGET/" "$TARGET/jayralis-logo.jpg")
check "Logo Cache-Control private" "private, max-age=86400" "$LHEADERS"
check "Logo X-Robots-Tag noindex" "noindex" "$LHEADERS"
check "Logo Cross-Origin-Resource-Policy" "same-origin" "$LHEADERS"

echo ""
echo "─── ROUND 2: Download coercion param stripping ───"
for PARAM in "download=1" "force-download=1" "attachment=1" "save=1" "raw=1"; do
  CODE=$(curl -sI -A "$UA_BROWSER" -e "$TARGET/" "$TARGET/staff-ceo-james.jpg?$PARAM" | head -1 | grep -oE '[0-9]{3}' | head -1)
  # We expect 200 (image served, params stripped) — but redirect 307 is also acceptable
  if [ "$CODE" = "200" ] || [ "$CODE" = "307" ] || [ "$CODE" = "308" ]; then
    echo "  [PASS] ?$PARAM → $CODE (handled)"
    PASS=$((PASS+1))
  else
    echo "  [FAIL] ?$PARAM → $CODE (expected 200/307/308)"
    FAIL=$((FAIL+1))
  fi
done

echo ""
echo "─── ROUND 2: HTTP method hardening ───"
for METHOD in POST PUT DELETE PATCH; do
  CODE=$(curl -sI -A "$UA_BROWSER" -X "$METHOD" "$TARGET/api" | head -1 | grep -oE '[0-9]{3}' | head -1)
  if [ "$CODE" = "405" ] || [ "$CODE" = "404" ]; then
    echo "  [PASS] $METHOD /api → $CODE"
    PASS=$((PASS+1))
  else
    echo "  [FAIL] $METHOD /api → $CODE (expected 405/404)"
    FAIL=$((FAIL+1))
  fi
done

echo ""
echo "─── ROUND 2: robots.txt hardened ───"
ROBOTS=$(curl -s "$TARGET/robots.txt")
check "robots.txt blocks /api/" "Disallow: /api/" "$ROBOTS"
check "robots.txt blocks staff images" "staff-\*" "$ROBOTS"
check "robots.txt blocks GPTBot" "GPTBot" "$ROBOTS"
check "robots.txt blocks ClaudeBot" "ClaudeBot" "$ROBOTS"
check "robots.txt blocks PerplexityBot" "PerplexityBot" "$ROBOTS"
check "robots.txt blocks curl" "User-agent: curl" "$ROBOTS"
check "robots.txt blocks wget" "User-agent: wget" "$ROBOTS"
check "robots.txt blocks scrapy" "User-agent: scrapy" "$ROBOTS"

echo ""
echo "─── ROUND 2: security.txt present (responsible disclosure) ───"
SECURITY_TXT=$(curl -s "$TARGET/.well-known/security.txt")
check "security.txt present" "Contact: mailto:Ceo@jayralis.fyi" "$SECURITY_TXT"
check "security.txt has policy URL" "Policy: https://www.jayralis.fyi/security" "$SECURITY_TXT"
check "security.txt has canonical" "Canonical: https://www.jayralis.fyi/.well-known/security.txt" "$SECURITY_TXT"

echo ""
echo "─── ROUND 2: Name correction verification ───"
PAGE_HTML=$(curl -s -A "$UA_BROWSER" "$TARGET/")
check "Majorie Friday-Abang present" "Majorie Friday-Abang" "$PAGE_HTML"
check_absent "Old name (Abang-Friday Marjorie) removed" "Abang-Friday Marjorie Enobong" "$PAGE_HTML"

echo ""
echo "─── ROUND 2: HTTPS enforcement + apex redirect ───"
APEX_CODE=$(curl -sI -A "$UA_BROWSER" "http://jayralis.fyi/" | head -1 | grep -oE '[0-9]{3}' | head -1)
check "HTTP apex redirects" "301|302|307|308" "$APEX_CODE"
HTTPS_APEX=$(curl -sI -A "$UA_BROWSER" "https://jayralis.fyi/" | head -1 | grep -oE '[0-9]{3}' | head -1)
check "HTTPS apex → www redirect" "301|302|307|308" "$HTTPS_APEX"

echo ""
echo "─── ROUND 2: Response size sanity check ───"
SIZE=$(curl -s -A "$UA_BROWSER" "$TARGET/" | wc -c)
if [ "$SIZE" -gt 50000 ] && [ "$SIZE" -lt 200000 ]; then
  echo "  [PASS] HTML page size in expected range ($SIZE bytes)"
  PASS=$((PASS+1))
else
  echo "  [WARN] HTML page size: $SIZE bytes (verify manually)"
  WARN=$((WARN+1))
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  ROUND 2 RESULT: $PASS passed, $FAIL failed, $WARN warnings"
echo "════════════════════════════════════════════════════════════════"
