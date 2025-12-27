# PWA 设置指南

## 📱 已完成的 PWA 功能

### ✅ 1. Manifest.json
- ✅ 配置了 `display: "standalone"` 实现全屏模式
- ✅ 设置了应用名称和短名称
- ✅ 配置了主题色和背景色
- ✅ 定义了各种尺寸的图标
- ✅ 设置了启动 URL 和作用域

### ✅ 2. Service Worker (sw.js)
- ✅ 实现了 install 事件，缓存核心资源
- ✅ 实现了 fetch 事件，提供离线支持
- ✅ 实现了 activate 事件，清理旧缓存
- ✅ 支持后台同步和推送通知
- ✅ 智能缓存策略（缓存优先 + 网络回退）

### ✅ 3. HTML 配置
- ✅ 正确引入了 manifest.json
- ✅ 注册了 Service Worker
- ✅ 设置了移动端 viewport，禁止用户缩放
- ✅ 配置了 iOS 和 Android 的特定 meta 标签
- ✅ 添加了 PWA 安装提示处理
- ✅ 防止双击缩放和长按选择

### ✅ 4. 额外功能
- ✅ PWA 安装提示组件
- ✅ 离线状态指示器
- ✅ 防止移动端的意外操作

## 🚀 需要手动完成的步骤

### 1. 生成应用图标
你需要创建以下尺寸的 PNG 图标文件，放在 `public/icons/` 目录下：

```
public/icons/
├── icon-16x16.png
├── icon-32x32.png
├── icon-72x72.png
├── icon-96x96.png
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
└── icon-512x512.png
```

**推荐工具：**
- [RealFaviconGenerator](https://realfavicongenerator.net/) - 在线生成所有尺寸
- [Favicon Generator](https://www.favicon-generator.org/) - 简单易用
- ImageMagick 命令行：`convert source.png -resize 192x192 icon-192x192.png`

### 2. 创建截图（可选）
为了更好的应用商店展示，在 `public/screenshots/` 目录下添加：
- `home.png` - 主页截图 (390x844 像素)

### 3. 测试 PWA 功能

#### 本地测试：
```bash
npm run build
npm run preview
```

#### 检查清单：
1. 打开 Chrome DevTools → Application → Manifest
2. 检查 Service Worker 是否正确注册
3. 测试离线功能（Network → Offline）
4. 测试安装提示（Chrome 地址栏的安装图标）

#### 移动端测试：
1. 在手机浏览器中打开应用
2. 查看是否出现"添加到主屏幕"提示
3. 安装后测试是否以全屏模式运行
4. 测试离线功能

### 4. 部署注意事项

#### HTTPS 要求：
- PWA 必须通过 HTTPS 提供服务
- localhost 可以用于开发测试

#### 服务器配置：
确保服务器正确提供以下文件的 MIME 类型：
```
manifest.json → application/manifest+json
sw.js → application/javascript
```

#### Nginx 配置示例：
```nginx
location /manifest.json {
    add_header Content-Type application/manifest+json;
}

location /sw.js {
    add_header Content-Type application/javascript;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

## 🔧 高级配置

### 自定义安装提示
应用已包含自定义的 PWA 安装提示组件，你可以在 `src/components/PWAInstallPrompt.vue` 中自定义样式和行为。

### 推送通知
Service Worker 已包含推送通知的基础代码，如需启用：
1. 在 Firebase 或其他推送服务中注册应用
2. 获取 VAPID 密钥
3. 在应用中请求通知权限
4. 订阅推送服务

### 后台同步
Service Worker 已包含后台同步的基础代码，可用于：
- 同步梦境收藏数据
- 上传离线时的用户操作
- 定期更新应用数据

## 📊 PWA 评分工具

使用以下工具检查 PWA 质量：
- Chrome DevTools → Lighthouse → Progressive Web App
- [PWA Builder](https://www.pwabuilder.com/)
- [Web.dev Measure](https://web.dev/measure/)

## 🎯 预期效果

完成设置后，用户将能够：
- 📱 将应用安装到手机主屏幕
- 🚀 以全屏模式运行，像原生应用一样
- 📶 在离线状态下继续使用基本功能
- 🔔 接收推送通知（如果启用）
- ⚡ 享受快速的加载体验（缓存）

## 🐛 常见问题

### Q: 安装提示不出现？
A: 确保应用通过 HTTPS 访问，且满足 PWA 的基本要求

### Q: Service Worker 不工作？
A: 检查浏览器控制台是否有错误，确保 sw.js 文件可访问

### Q: 离线功能不工作？
A: 检查 Service Worker 是否正确缓存了必要的资源

### Q: iOS 上的表现？
A: iOS 对 PWA 的支持有限，但基本功能（安装、离线）是支持的