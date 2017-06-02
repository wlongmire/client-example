#!/bin/bash

CURRENT_PATH=$(pwd)
S3_BUCKET_URL_BASE="ownersedge"
ENV=""

usage() { echo "Usage: $0 -e {dev qa, prod}" 1>&2; exit 1; }

check_environment()
{
  if [ -z $ENV ]; then
    usage
    exit -1
  fi

  if [ $ENV != "dev" ] && [ $ENV != "qa" ] && [ $ENV != "prod" ]; then
    usage
    exit -1
  fi
}

upload_website_to_s3()
{
  printf "~ uploading app to S3 ..."

  cd dist/public

  # upload to s3
  myCmd=$(printf 'aws s3 sync . s3://%s-%s/' $S3_BUCKET_URL_BASE $ENV) #'aws s3 cp dist/public/* s3://%s-%s/ --recursive' $S3_BUCKET_URL_BASE $ENV)

  $($myCmd) 2>&1 | grep -i 'error'
  
  cd ../

  printf "\t[OK]\n"
}

# get flags
while getopts "e:" o; do
  case "${o}" in
    e)
      ENV=${OPTARG}
      ;;
    *)
      usage
      ;;
  esac
done

# check if the environment variable is set and/or if it's correct
check_environment

# upload the cf template to s3 for reference
upload_website_to_s3

echo "success" > status.txt
