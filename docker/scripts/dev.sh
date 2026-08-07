#!/bin/bash
set -e

docker compose \
  --project-name mobilsiap-dev \
  -f docker/dev/docker-compose.yml \
  "$@"
