@echo off
cd player
start gulp
cd dest
echo Serving player client on 0.0.0.0:3001
start php -S 0.0.0.0:3001
cd ../../screen
start gulp
cd dest
echo Serving screen client on 0.0.0.0:3002
start php -S 0.0.0.0:3002
