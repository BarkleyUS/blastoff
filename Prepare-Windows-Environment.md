# TODO: Auto install Node and Ruby on Windows Environment

## CONCEPT 1 - From the Command Line - BAT?

#### CMD - Download Chocolatey
```@powershell -NoProfile -ExecutionPolicy unrestricted -Command "(iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))) >$null 2>&1" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin```

#### CMD - Download and Install Node
```choco install nodejs.install```

#### CMD - Download and Install Ruby
```choco install ruby```



## CONCEPT 2 - PowerShell Direct Link install-node-ruby.ps1

#### Set up the download URL for ruby
$download_url = "http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.1.5-x64.exe"
$installer_dest = "$env:temp\"+$download_url.Split('/')[-1]

#### Download file using the .NET WebClient object
$webclient = New-Object System.Net.WebClient
$webclient.DownloadFile($download_url, $installer_dest)

#### Execute the silent installer
Invoke-Expression "$installer_dest /silent"

#### Remove the original installation file from the file system
Remove-Item $installer_dest -recurse

#### Set up the download URL for Node
$download_url = "http://nodejs.org/dist/v0.12.0/x64/node-v0.12.0-x64.msi"

#### Extract the name of the EXE from the URL
$installer_dest = "$env:temp\"+$download_url.Split('/')[-1]

#### Download file using the .NET WebClient object
$webclient = New-Object System.Net.WebClient
$webclient.DownloadFile($download_url, $installer_dest)

#### Execute the silent installer
Invoke-Expression "$installer_dest /silent"

#### Remove the original installation file from the file system
Remove-Item $installer_dest -recurse
