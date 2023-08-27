const ruleTypes = {
    range: 'range',
    equal: 'equality',
};

/**
 * TransactionValidator
 * Performs various checks on a transaction object against given rules set.
 * The checks are different depending on the rule type.
 */
class TransactionValidator {
    /**
     * Checks if a prop value in within the range defined by a rule
     * @param {object} transaction - the transaction object
     * @param {object} rule - the rule's definition
     * @returns {boolean} - true if there is a match, false if not
     */
    matchByRange (transaction, rule) {
        const [min, max] = rule.values;
        const propValue = transaction[rule.propName];
        return propValue > propValue.gt(min) && propValue.lt(max);
    }

    /**
     * Checks if a prop value is equal to one of a set of possible values.
     * @param {object} transaction - the transaction object
     * @param {object} rule - the rule's definition
     * @returns {boolean}
     */
    matchByEqual (transaction, rule) {
        return rule.values.includes(transaction[rule.propName]);
    }

    /**
     * Loops all rules within a configuration and checks a transaction against each rule.
     * @param {object} transaction - the transaction object
     * @param {object} config - the current configuration
     * @returns {boolean}
     */
    hasMatch (transaction, config) {
        const rules = config.rules;
        let match = false;

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (rule.type === ruleTypes.range) match = this.matchByRange(transaction, rule);
            if (rule.type === ruleTypes.equality) match = this.matchByEqual(transaction, rule);

            if (match) break;
        }

        return match;
    }
}

module.exports = new TransactionValidator();
