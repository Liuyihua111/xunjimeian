# 接口契约摘要

以桌面 `寻迹梅庵/分工/00-接口与路径契约.md` 为唯一标准。

- `/api/chat/`: POST，返回 `answer/confidence/warning/route/sources`。
- `/api/sources/`: GET，返回史料列表。
- `/api/sources/<id>/`: GET，返回单条史料详情。
- `/api/tags/`: GET，返回固定标签表。
- `/api/projects/`: GET，返回历代成果，结构与 `/assets/data/projects.json` 一致。
- `/api/model/`: GET，返回模型状态。

静态资源路径：

- `/assets/data/projects.json`
- `/assets/models/xieyuanding/xieyuanding.glb`
- `/assets/models/xieyuanding/preview.png`
- `/assets/projects/<year>/...`
