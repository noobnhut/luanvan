import axios from 'axios'
import dayjs from 'dayjs';
class postService {

    url = `${import.meta.env.VITE_API_BASE_URL}`;
    // post render
    async renderPost() {
        try {
            const result = await axios.get(
                `${this.url}post/render`
            );
            return result.data
        } catch (e) {
            console.log(e);
        }
    }
   
   
    async deleteVideo(id) {
        try {
            const result = await axios.delete(`${this.url}post/deleteVideobypost/` + id);
        } catch (e) {
            console.log(e);
        }
    }
    async deleteComment(id) {
        try {
            const result = await axios.delete(`${this.url}post/deleteCommentbypost/` + id);
        } catch (e) {
            console.log(e);
        }
    }
    async deleteLike(id) {
        try {
            const result = await axios.delete(`${this.url}post/deleteLikebypost/` + id);
        } catch (e) {
            console.log(e);
        }
    }
    async deleteFollow(id) {
        try {
            const result = await axios.delete(`${this.url}post/deleteFollowbypost/` + id);
        } catch (e) {
            console.log(e);
        }
    }
    async deletePost(id) {
        try {
            const result = await axios.delete(`${this.url}post/delete/` + id);
        } catch (e) {
            console.log(e);
        }
    }

    // handle like
    async getLike() {
        try {
            const result = await axios.get(`${this.url}like/getlike`);
            return result.data
        } catch (error) {
            console.log(error)
        }
    }
    async unlike(id_user, id, postid) {
        try {
            const result = await axios.post(`${this.url}like/addlike`,
                {
                    id_user: id_user,
                    id_post: postid,
                    id: id
                });
            return result.data
        } catch (error) {
            console.log(error)
        }
    }
    async addlike(id_user, postid) {
        try {
            const result = await axios.post(`${this.url}like/addlike`,
                {
                    id_user: id_user,
                    id_post: postid,
                    status: 'true'
                });
            return result.data
        } catch (error) {
            console.log(error)
        }
    }
    resultLike(id, likes) {
        return likes.filter(like => like.id_post === id).length;
    }

    // handle comment
    async addcomment(id,id_user,comments) {
        try {
            const result = await axios.post(`${this.url}comment/create`,
                {
                    id_user: id_user,
                    id_post: id,
                    comment_content: comments
                })

            return result;

        } catch (error) {
            console.log(error)
        }
    }
    async getcomment() {
        try {
            const result = await axios.get(`${this.url}comment/get`);
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }
    async deletecommentByid(id) {
        try {
            const result = await axios.delete(`${this.url}comment/delete/` + id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    async updateComment(id,comment_content) {
        try {
            const result = await axios.put(`${this.url}comment/edit/` + id, {
                comment_content: comment_content,
            });
         return result;
        } catch (error) {
            console.log(error);
        }


    }


    // handle share and follow post
    share(post,refs) {
        const path = `${import.meta.env.VITE_API_BASE_URL_API}detailpost/${post.title}/${post.id}`;
        const tempInput = document.createElement('input');
        tempInput.value = path;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        refs.toast.showToast('Đường dẫn đã lưu');
    }

    async getfollow() {
        try {
            const result = await axios.get(`${this.url}follow/getfollow`);
            return  result.data
        } catch (error) {
            console.log(error)
        }
    }
    async unfollow(id_user,id, postid) {
        try {
            const result = await axios.post(`${this.url}follow/addfollow`,
                {
                    id_user: id_user,
                    id_post: postid,
                    id: id
                });
                return result;

        } catch (error) {
            console.log(error)
        }
    }
    async addfollow(id_user,postid) {
        try {
            const result = await axios.post(`${this.url}follow/addfollow`,
                {
                    id_user:id_user,
                    id_post: postid,
                    status: 'true'
                });
                return result;

        } catch (error) {
            console.log(error)
        }
    }

    //format method
    formatCurrency(value) {
        let val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đồng'
    }
    getTimeFromCreatedAt(createdAt) {
        const now = dayjs();
        const diffInSeconds = now.diff(createdAt, 'second');

        if (diffInSeconds < 60) {
            return `${diffInSeconds} giây`;
        } else if (diffInSeconds < 3600) {
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            return `${diffInMinutes} phút`;
        } else if (diffInSeconds < 86400) {
            const diffInHours = Math.floor(diffInSeconds / 3600);
            return `${diffInHours} giờ`;
        } else {
            const diffInDays = Math.floor(diffInSeconds / 86400);
            return `${diffInDays} ngày`;
        }
    }

}
export default new postService();