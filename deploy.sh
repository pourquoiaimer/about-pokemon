# 发生任何错误时终止
set -e

# 构建
npm run build

# 进入输出产物文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init

git checkout pages

git add -A

git commit -m 'deploy'

git push -f https://github.com/pourquoiaimer/The-F2E-4th-week3.git pages