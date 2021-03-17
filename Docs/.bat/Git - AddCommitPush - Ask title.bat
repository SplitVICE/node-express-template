cd ..
cd ..
@echo off
set /p title="Enter your commit title:"
git add .
git commit -m "%title%"
git push origin master
@echo off
set /p id="Commands finished. Press any key to close."

