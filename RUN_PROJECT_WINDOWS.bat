@echo off
setlocal
cd /d "%~dp0"
if not exist backend\venv\Scripts\python.exe (
  echo Creating backend virtual environment...
  py -m venv backend\venv
  if errorlevel 1 python -m venv backend\venv
  backend\venv\Scripts\python.exe -m pip install -r backend\requirements.txt
)
start "Salarite Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000"
start "Salarite Frontend" cmd /k "cd /d %~dp0frontend && npm install && npm run dev"
echo.
echo Backend:  http://localhost:8000/docs
echo Health:   http://localhost:8000/api/health
echo Frontend: http://localhost:5173
