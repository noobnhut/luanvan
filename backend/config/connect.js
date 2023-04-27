const { Sequelize } =require("sequelize");
const sequelize = new Sequelize("luanvan","root",null,{
  host:"localhost",
  dialect:"mysql",
  logging: false,
})

const ConnectDatabase = async()=>{
  try {
    await sequelize.authenticate();
    console.log("đã kết nối với database.");
  } catch (error) {
    console.error("kết nối thất bại", error);
  }
}
ConnectDatabase()