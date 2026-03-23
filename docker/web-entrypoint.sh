#!/bin/sh
set -eu

echo "Waiting for PostgreSQL and syncing Prisma schema..."

attempt=0
until npx prisma db push --skip-generate >/tmp/prisma-db-push.log 2>&1
do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 20 ]; then
    cat /tmp/prisma-db-push.log
    exit 1
  fi
  sleep 2
done

rm -f /tmp/prisma-db-push.log

exec npm run start -- --hostname 0.0.0.0 --port 3000
