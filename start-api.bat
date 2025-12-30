@echo off
echo Starting API Server...
echo.
cd /d "%~dp0api"
echo Current directory: %CD%
echo.
echo Installing dependencies if needed...
call npm install
echo.
echo Starting API server on port 4000...
echo.
echo API will be available at: http://localhost:4000
echo Health check: http://localhost:4000/health
echo.
echo Press Ctrl+C to stop the server
echo.
call npm run dev
pause

