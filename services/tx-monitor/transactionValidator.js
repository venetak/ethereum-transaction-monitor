const ruleTypes = {
    range: 'range',
    equal: 'equality',
};

class TransactionValidator {
    matchByRange (transaction, rule) {
        const [min, max] = rule.values;
        const propValue = transaction[rule.propName];
        return propValue > propValue.gt(min) && propValue.lt(max);
    }

    matchByEqual (transaction, rule) {
        return rule.values.includes(transaction[rule.propName]);
    }

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
