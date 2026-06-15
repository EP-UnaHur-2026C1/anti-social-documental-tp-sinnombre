export const commentsVisibility = (req, res, next) => {

    const months =
        Number(process.env.COMMENTS_VISIBLE_MONTHS) || 6;

    const limitDate = new Date();

    limitDate.setMonth(
        limitDate.getMonth() - months
    );

    req.limitDate = limitDate;

    next();
};