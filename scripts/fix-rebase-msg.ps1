# Git 在 reword 时调用，参数为 COMMIT_EDITMSG 文件路径
# 将乱码提交信息替换为正确的中文（UTF-8）
param([string]$msgPath = $args[0])
$content = Get-Content -LiteralPath $msgPath -Raw -Encoding UTF8
if (-not $content) { exit 0 }
$newMsg = $null
if ($content -match '瀹屽杽甯冨眬') {
  $newMsg = "feat: 完善布局组件，添加用户管理和文章管理相关页面`n"
} elseif ($content -match '娣诲姞寮曞') {
  $newMsg = "feat: 添加引导组件并优化相关组件和样式`n"
} elseif ($content -match '鏂板鐢ㄦ埛绠＄悊') {
  $newMsg = "feat: 新增用户管理、权限角色、角色管理和文章管理功能模块`n"
}
if ($newMsg) {
  [System.IO.File]::WriteAllText($msgPath, $newMsg, [System.Text.UTF8Encoding]::new($false))
}
exit 0
