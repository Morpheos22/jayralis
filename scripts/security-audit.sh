#!/usr/bin/env bash
# Security audit of live jayralis.fyi deployment
set -u
TARGET="https://www.jayralis.fyi"
UA_BROWSER="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
UA_CURL="curl/8.0"
PASS=0
FAIL=0
WARN=0

check_absent() {
  # Pass if the pattern is NOT present in the response
  local name="$1" pattern="$2" actual="$3"
  if echo "$actual" | grep -qiE "$pattern"; then
    echo "  [FAIL] $name (found forbidden pattern: $pattern)"
    FAIL=$((FAIL+1))
  else
    echo "  [PASS] $name"
    PASS=$((PASS+1))
  fi
}

check() {
  local name="$1" expected="$2" actual="$3"
  if echo "$actual" | grep -qiE "$expected"; then
    echo "  [PASS] $name"
    PASS=$((PASS+1))
  else
    echo "  [FAIL] $name"
    echo "        expected: $expected"
    echo "        actual:   $actual"
    FAIL=$((FAIL+1))
  fi
}

echo "════════════════════════════════════════════════════════════════"
echo "  JAYRALIS.FYI — SECURITY HARDENING VERIFICATION"
echo "  Target: $TARGET"
echo "════════════════════════════════════════════════════════════════"

echo ""
echo "─── 1. Security Headers on main HTML page ───"
HEADERS=$(curl -sI -A "$UA_BROWSER" "$TARGET/" )
check "Content-Security-Policy" "default-src 'self'" "$HEADERS"
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
echo "─── 2. Asset protection: staff images (browser w/ referer) ───"
SHEADERS=$(curl -sI -A "$UA_BROWSER" -e "$TARGET/" "$TARGET/staff-ceo-james.jpg")
check "Cache-Control private" "private, max-age=86400" "$SHEADERS"
check "X-Robots-Tag noindex" "noindex" "$SHEADERS"
check "Cross-Origin-Resource-Policy same-origin" "same-origin" "$SHEADERS"
check "Cross-Origin-Embedder-Policy require-corp" "require-corp" "$SHEADERS"
check "Content-Type image/jpeg" "image/jpeg" "$SHEADERS"

echo ""
echo "─── 3. Asset protection: anti-scraping (curl w/o referer) ───"
BLOCKED=$(curl -sI -A "$UA_CURL" "$TARGET/staff-ceo-james.jpg" | head -1)
check "Block curl scraper on staff image" "403" "$BLOCKED"

echo ""
echo "─── 4. Endpoint enumeration blocked ───"
API_FOO=$(curl -sI -A "$UA_BROWSER" "$TARGET/api/foo" | head -1)
check "/api/foo returns 404" "404" "$API_FOO"
API_BAR=$(curl -sI -A "$UA_BROWSER" "$TARGET/api/users" | head -1)
check "/api/users returns 404" "404" "$API_BAR"

echo ""
echo "─── 5. Sensitive files blocked ───"
for P in /.env /.env.local /package-lock.json /bun.lock /vercel.json /next.config.ts /tsconfig.json /README.md /worklog.md /proxy.ts /middleware.ts; do
  CODE=$(curl -sI -A "$UA_BROWSER" "$TARGET$P" | head -1 | grep -oE '[0-9]{3}')
  if [ "$CODE" = "404" ] || [ "$CODE" = "403" ]; then
    echo "  [PASS] $P → $CODE"
    PASS=$((PASS+1))
  else
    echo "  [FAIL] $P → $CODE (expected 404/403)"
    FAIL=$((FAIL+1))
  fi
done

echo ""
echo "─── 6. HTTP method hardening on API ───"
POST=$(curl -sI -A "$UA_BROWSER" -X POST "$TARGET/api" | head -1)
check "POST /api blocked" "405|404" "$POST"
PUT=$(curl -sI -A "$UA_BROWSER" -X PUT "$TARGET/api" | head -1)
check "PUT /api blocked" "405|404" "$PUT"
DELETE=$(curl -sI -A "$UA_BROWSER" -X DELETE "$TARGET/api" | head -1)
check "DELETE /api blocked" "405|404" "$DELETE"

echo ""
echo "─── 7. robots.txt hardened ───"
ROBOTS=$(curl -s "$TARGET/robots.txt")
check "robots.txt blocks /api/" "Disallow: /api/" "$ROBOTS"
check "robots.txt blocks staff images" "staff-\*" "$ROBOTS"
check "robots.txt blocks GPTBot" "GPTBot" "$ROBOTS"
check "robots.txt blocks ClaudeBot" "ClaudeBot" "$ROBOTS"
check "robots.txt blocks PerplexityBot" "PerplexityBot" "$ROBOTS"
check "robots.txt blocks curl/wget/scrapy" "scrapy" "$ROBOTS"

echo ""
echo "─── 8. HTTPS enforcement ───"
HTTP_CODE=$(curl -sI -A "$UA_BROWSER" "http://jayralis.fyi/" | head -1)
check "HTTP redirects to HTTPS" "301|302|307|308" "$HTTP_CODE"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  RESULT: $PASS passed, $FAIL failed, $WARN warnings"
echo "════════════════════════════════════════════════════════════════"
