https://coderthemes.com/hyper/saas/icons-unicons.html?
https://github.com/envomer/tailwindcss-chat
https://flowbite.com/
https://fontawesome.com/icons/ellipsis?f=classic&s=solid
https://github.com/stopwords/vietnamese-stopwords/blob/master/vietnamese-stopwords.txt
 https://devpress.csdn.net/vue/62f0d8597e6682346618365d.html
npx sequelize-cli db:migrate
https://codesandbox.io/p/sandbox/fnw0gf?file=%2Fsrc%2FApp.vue%3A1%2C1
https://ej2.syncfusion.com/vue/documentation/rating/vue-3-getting-started
admin 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
npx sequelize-cli model:generate --name User_Report --attributes user_report:integer,user_reported:integer,report_content:string


npx sequelize-cli model:generate --name user --attributes username:string,email:string,password:string,address:string,phone:string,avatar:string,citycode:integer,districtcode:integer,communecode:integer,ranking_score:integer,is_active:boolean,notification_status:boolean

npx sequelize-cli model:generate --name Category --attributes cat_name:string

npx sequelize-cli model:generate --name User_Rating --attributes rating_score:DECIMAL,to_user:integer,from_user:integer,rating_content:string

npx sequelize-cli model:generate --name Post --attributes id_cat:integer,id_user:integer,type:ENUM,post_content:string,title:string,citycode:integer,districtcode:integer,communecode:integer


npx sequelize-cli model:generate --name Img --attributes image_name:string,url:string

npx sequelize-cli model:generate --name Video--attributes video_name:string,url:string


npx sequelize-cli model:generate --name Report_User --attributes user_reported:integer,user_report:integer,report_content:string


npx sequelize-cli model:generate --name Post_Like --attributes id_user:integer,id_post:integer,status:boolean


npx sequelize-cli model:generate --name Post_Comment --attributes id_user:integer,id_post:integer,comment_content:string,rep_id:integer


npx sequelize-cli model:generate --name Save_Post --attributes id_user:integer,id_post:integer,status:boolean

Notification

npx sequelize-cli model:generate --name Notification --attributes id_user:integer,id_post:integer,notification_content:string


npx sequelize-cli model:generate --name messenger --attributes sender_id:integer,receiver_id:integer,nmessager:string


npx sequelize-cli model:generate --name Follow --attributes userfollow:integer,userfollowed:integer

npx sequelize-cli model:generate --name NotificationSetting --attributes id_user:integer,status:boolean,location_radius:double

npx sequelize-cli model:generate --name Admin --attributes email:string,password:string