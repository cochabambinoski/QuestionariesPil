const JsxStyles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    headTable: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
    },
    bodyHeadTable: {
        fontSize: 14,
    },
});

export default JsxStyles;
