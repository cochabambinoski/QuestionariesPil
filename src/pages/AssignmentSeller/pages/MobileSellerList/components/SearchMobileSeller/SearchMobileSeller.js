import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux';
import {getMobileAssignement, getTypeByCodSap} from "../../../../../../reducers";
import Constants from "../../../../../../Constants";
import {deleteAllAssignementUser, editQueryTextMobileSellerList} from "../../../../../../actions";

const suggestions = [
    {label: 'BRAÑEZ RAMIREZ ENRIQUE'},
    {label: 'ORTEGA ALVAREZ CLAUDIO RAUL'},
    {label: 'BUSTAMANTE MAMANI JOSE LUIS'},
    {label: 'ALDUINATE PALMA DENIS DAVID'},
];

function renderInput(inputProps) {
    const {InputProps, classes, ref, ...other} = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion({suggestion, index, itemProps, highlightedIndex, selectedItem}) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({label: PropTypes.string}).isRequired,
};

function getSuggestions(inputValue) {
    let count = 0;

    return suggestions.filter(suggestion => {
        const keep =
            (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
            count < 5;

        if (keep) {
            count += 1;
        }

        return keep;
    });
}

class DownshiftMultiple extends React.Component {
    state = {
        inputValue: '',
        selectedItem: [],
    };

    handleChange = item => {
        let {selectedItem} = this.state;

        if (selectedItem.indexOf(item) === -1) {
            selectedItem = [...selectedItem, item];
        }

        this.setState({
            inputValue: '',
            selectedItem,
        });
    };

    render() {
        const {inputValue, selectedItem} = this.state;

        return (
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={this.handleChange}
                selectedItem={selectedItem}
            >
            </Downshift>
        );
    }
}

DownshiftMultiple.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 50,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
        background: '#ffffff',
        padding: 5,
        elevation: 15,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
        borderRadius: 5,
        elevation: 10,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function SearchMobileSeller(props) {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <Downshift id="downshift-simple">
                {({getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex}) => (
                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            InputProps: getInputProps({
                                placeholder: 'Nombre Del Vendedor',
                            }),
                        })}
                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {getSuggestions(inputValue).map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({item: suggestion.label}),
                                        highlightedIndex,
                                        selectedItem,
                                    }),
                                )}
                            </Paper>
                        ) : null}
                    </div>
                )}
            </Downshift>
            <div className={classes.divider}/>
            <DownshiftMultiple classes={classes}/>
            <div className={classes.divider}/>

        </div>
    );
}

SearchMobileSeller.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    assignmentUser: getMobileAssignement(state),
    typeQuestionerQuestionary: getTypeByCodSap(state, Constants.CODSAP_QUESTIONER_QUESTIONARY_OPEN),
    querySearchView: state.queryMobileSeller,
});

const mapDispatchToProps = dispatch => ({
    deleteAllAssignementUser: value => dispatch(deleteAllAssignementUser()),
    editQueryText: value => dispatch(editQueryTextMobileSellerList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchMobileSeller));