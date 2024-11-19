import borrowModel from "../models/BorrowModels.js";
import fineModel from "../models/FineModels.js";

const AutoGenerateFineMiddleware = async (req, res, next) => {
    try {
        const borrows = await borrowModel.findAll({
            where: {
                dayReturn: null,
            },
        });
        const currentDate = new Date();
        for (const borrow of borrows) {
            const dueDate = new Date(borrow.dueDate);
            const daysLate = Math.floor((currentDate - dueDate) / (1000 * 60 * 60 * 24));

            if (daysLate > 0) {
                const existingFine = await fineModel.findOne({
                    where: { id_borrow: borrow.id },
                });

                if (!existingFine) {
                    await fineModel.create({
                        id_borrow: borrow.id,
                        amount: daysLate * 2000,
                    });
                }
            }
        }

        next();
    } catch (error) {
        console.error("Error generating fines:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default AutoGenerateFineMiddleware;
