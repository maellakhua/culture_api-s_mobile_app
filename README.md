culture_api-s_mobile_app
========================
How To - Build & install apk
----------------------------
1. Create new ionic project 
   > ionic start myProject

2. Open the new folder
   > cd myProject

3. Add cordova geolocation plugin
   > cordova plugin add org.apache.cordova.geolocation

4. Download project from github , open file , replace folder [www] to myProject

5. Add an android platform
   > ionic platfrom add android

6. Build an apk
   > ionic build

7. Send the apk to mobile , apk is in folder platforms/android/ant-build/ellak-debug-unaligned.apk
