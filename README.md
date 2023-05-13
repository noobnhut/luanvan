https://coderthemes.com/hyper/saas/icons-unicons.html?
https://github.com/envomer/tailwindcss-chat
https://flowbite.com/

npx sequelize-cli model:generate --name Admin --attributes email:string,password:string


 async create() {
            let id_user = this.user.id

            const formVideo = new FormData();
            formVideo.append('video', this.video)
            const formImg = new FormData();

            for (let i = 0; i < this.avatar.length; i++) {
                const file = this.avatar[i];
                formImg.append('avatar', file);
            }

            const formData = new FormData();
            formData.append('id_user', id_user);
            formData.append('id_cat', this.catid);
            formData.append('citycode', this.city_id);
            formData.append('districtcode', this.districts_code);
            formData.append('communecode', this.commune_id);
            formData.append('title', this.title);
            formData.append('price', this.price);
            formData.append('post_content', this.post_content);
            formData.append('type', this.type);
            formData.append('status', true);
            try {
                const response = await this.$axios.post('post/create', formData, {
                });
                const id_post = response.data;
                if (response.status == 200 && id_post > 0) {
                    const addimg = await this.$axios.post(`post/addimg/${id_post}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    const addvideo = await this.$axios.post(`post/addvideo/${id_post}`, formVideo, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (addvideo.status == 201) {
                        this.onclose()
                    }
                }

            } catch (error) {
                console.error(error);
            }

        },