https://coderthemes.com/hyper/saas/icons-unicons.html?
https://github.com/envomer/tailwindcss-chat
https://flowbite.com/
https://fontawesome.com/icons/ellipsis?f=classic&s=solid
npx sequelize-cli model:generate --name Admin --attributes email:string,password:string
npx sequelize-cli model:generate --name follow --attributes id_user:integer,status:boolean

  copyPath() {
            const path = 'Đường dẫn cần sao chép 2';
            const tempInput = document.createElement('input');
            tempInput.value = path;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            alert('Đường dẫn đã được sao chép!');
        }