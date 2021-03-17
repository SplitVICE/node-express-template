cd ..
cd ..
@echo off
set /p title="Enter your commit title:"
set /p description="Enter your commit description:"
git add .
git commit -m "%title%" -m "%description%"
git push origin master
@echo off
set /p id="Commands finished. Press any key to close."

