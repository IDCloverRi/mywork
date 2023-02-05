import db from "../config/database.js";

export const getVxsp = (_, res) => {
  const q = "SELECT * FROM vxsptest";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

// export const getVxsp = async (req, res) => {
//   const page = parseInt(req.query.page) || 0;
//   const limit = parseInt(req.query.limit) || 10;
//   const search = req.query.search_query || "";
//   const offset = limit * page;
//   const totalRows = await Vxsp.count({
//     where: {
//       [Op.or]: [
//         {
//           soDangKy: {
//             [Op.like]: "%" + search + "%",
//           },
//         },
//         {
//           tenThuoc: {
//             [Op.like]: "%" + search + "%",
//           },
//         },
//       ],
//     },
//   });

//   const totalPage = Math.ceil(totalRows / limit);
//   const result = await Vxsp.findAll({
//     where: {
//       [Op.or]: [
//         {
//           soDangKy: {
//             [Op.like]: "%" + search + "%",
//           },
//         },
//         {
//           tenThuoc: {
//             [Op.like]: "%" + search + "%",
//           },
//         },
//       ],
//     },
//     offset: offset,
//     limit: limit,
//     order: [["id", "DESC"]],
//   });
//   res.json({
//     result: result,
//     page: page,
//     limit: limit,
//     totalRows: totalRows,
//     totalPage: totalPage,
//   });
// };
