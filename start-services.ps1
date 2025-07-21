# EcoCart Score - Start All Services
Write-Host "Starting EcoCart Score Application..." -ForegroundColor Green

# Set environment variables
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.15.6-hotspot"
$env:PATH += ";C:\Program Files\Microsoft\jdk-17.0.15.6-hotspot\bin;$env:USERPROFILE\scoop\apps\maven\current\bin"

$MAVEN_CMD = "$env:USERPROFILE\scoop\apps\maven\current\bin\mvn.cmd"

Write-Host "Java Version:" -ForegroundColor Yellow
& "C:\Program Files\Microsoft\jdk-17.0.15.6-hotspot\bin\java.exe" -version

Write-Host "`nMaven Version:" -ForegroundColor Yellow
& $MAVEN_CMD --version

Write-Host "`nStarting Backend Services..." -ForegroundColor Green

# Start API Gateway (Port 8080)
Write-Host "Starting API Gateway on port 8080..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend\api-gateway'; & '$MAVEN_CMD' spring-boot:run"

Start-Sleep -Seconds 3

# Start Product Metadata Service (Port 8081)
Write-Host "Starting Product Metadata Service on port 8081..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend\product-metadata-service'; & '$MAVEN_CMD' spring-boot:run"

Start-Sleep -Seconds 3

# Start Scoring Engine Service (Port 8082)
Write-Host "Starting Scoring Engine Service on port 8082..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend\scoring-engine-service'; & '$MAVEN_CMD' spring-boot:run"

Start-Sleep -Seconds 3

# Start Reward Service (Port 8083)
Write-Host "Starting Reward Service on port 8083..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend\reward-service'; & '$MAVEN_CMD' spring-boot:run"

Start-Sleep -Seconds 3

# Start Cart Analyzer Service (Port 8090)
Write-Host "Starting Cart Analyzer Service on port 8090..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend\cart-analyzer-service'; & '$MAVEN_CMD' spring-boot:run"

Start-Sleep -Seconds 3

# Start Frontend (Port 3000)
Write-Host "Starting Frontend on port 3000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; npm run dev"

Write-Host "`nAll services are starting..." -ForegroundColor Green
Write-Host "Frontend will be available at: http://localhost:3000" -ForegroundColor Yellow
Write-Host "API Gateway will be available at: http://localhost:8080" -ForegroundColor Yellow
Write-Host "`nServices should start within 30-60 seconds..." -ForegroundColor Yellow
Write-Host "Press any key to check service status..." -ForegroundColor Magenta
Read-Host

# Check service status
Write-Host "`nChecking service status..." -ForegroundColor Green
netstat -an | findstr ":3000 :8080 :8081 :8082 :8083 :8090" 