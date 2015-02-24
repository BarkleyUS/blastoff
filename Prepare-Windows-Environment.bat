@echo off
SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (set "DEL=%%a")

call :ColorText 0c "Preparing Environment for Blastoff"
echo.
call :ColorText 0c "---------------------------------------"
echo.
call :ColorText 0a "Installing Chocolatey"
echo.
echo.
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "(iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))) >$null 2>&1" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
echo.

call :ColorText 0a "Installing NodeJS"
echo.
echo.
choco install nodejs.install -y
echo.

call :ColorText 0a "Installing Ruby"
echo.
echo.
choco install ruby -y
echo.

::call :ColorText 0a "Installing Git"
::echo.
::echo.
::choco install git.install -y
::echo.

echo.
call :ColorText 0c "---------------------------------------"
echo.
echo.
call :ColorText 0a "Installations Complete"

timeout /t 5

goto :eof

:ColorText
echo off
<nul set /p ".=%DEL%" > "%~2"
findstr /v /a:%1 /R "^$" "%~2" nul
del "%~2" > nul 2>&1
goto :eof
