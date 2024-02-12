#!/bin/bash  
  
# 询问新建的md文件名  
read -p "请输入新的说说文件名（不包含.md扩展名）: " md_filename  
  
# 创建以UTC时间为时间戳的Markdown文件  
timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")  
full_md_filename="${md_filename}.md"  
echo "已创建文件: ${full_md_filename}"  
touch "${full_md_filename}"  
  
# 以YAML格式写入文件头，包括UTC时间戳  
cat>"${full_md_filename}"<<EOF  
---  
date: "${timestamp}"  
---  
EOF
touch "_index.md"  
# 在index.md文件的第10行写入包含指令  
sed -i "10 a {{% include "${md_filename}" %}}" _index.md  
echo "已在index.md文件的第10行添加包含指令来包含${full_md_filename}文件，并使用UTC时间戳。"