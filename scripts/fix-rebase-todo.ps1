# GIT_SEQUENCE_EDITOR：把需要改信息的提交从 pick 改为 reword
param([string]$todoPath = $args[0])
(Get-Content $todoPath -Encoding UTF8) `
  -replace '^pick 35ecb7d ', 'reword 35ecb7d ' `
  -replace '^pick c2051b1 ', 'reword c2051b1 ' `
  -replace '^pick e7a127f ', 'reword e7a127f ' |
  Set-Content $todoPath -Encoding UTF8
exit 0
