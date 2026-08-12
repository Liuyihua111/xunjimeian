# 部署说明

目标服务器：`admin@121.40.75.16`

## 目录

```text
/home/admin/xunji-meian/
  frontend/dist/
  backend/
  deploy/
```

## 后端

```bash
cd /home/admin/xunji-meian/backend
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_demo_data
gunicorn xunjimeian.wsgi:application --bind 127.0.0.1:8000
```

## 前端

```bash
cd /home/admin/xunji-meian/frontend
npm install
npm run build
```

## Nginx

将 `deploy/nginx.conf` 放到 `/etc/nginx/sites-available/xunji-meian`，链接到 `sites-enabled` 后重载 Nginx。

## 验收

```bash
curl http://121.40.75.16/api/model/
curl -X POST http://121.40.75.16/api/chat/ -H 'Content-Type: application/json' -d '{"question":"谢远定是谁？"}'
```
