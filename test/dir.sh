#!/bin/sh

rm -rf /tmp/find-folder
mkdir -p /tmp/find-folder/deep1/deep2/deep3
mkdir -p /tmp/find-folder/.git
mkdir -p /tmp/find-folder/a1/a2/a3

touch /tmp/find-folder/deep1/deep1.txt
touch /tmp/find-folder/deep1/deep2/deep2.txt

touch /tmp/find-folder/1.txt

touch /tmp/find-folder/.git/11111

touch /tmp/find-folder/a1/a1.md
touch /tmp/find-folder/a1/a2/a2.md
touch /tmp/find-folder/a1/a2/a3/a3.md
