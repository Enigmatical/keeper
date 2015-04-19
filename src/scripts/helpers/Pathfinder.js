'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = {
    helpers: {
        buildOptions: function(items, useStartCase) {
            var array = [];
            var options = [];
            if (_.isArray(items)) {
                array = items;
            }
            else if (_.isObject(items)) {
                for (var k in items) array.push(k);
            }
            else {
                return options;
            }

            _.each(array, function(a) {
                var label = a;
                if (useStartCase) {
                    label = _.startCase(a);
                }

                options.push({'label': label, 'value': a});
            });

            return options;
        }
    },

    statics: {
        challengeRatings: {
            '1/8': {
                xp:         50,
                reward:     21
            },
            '1/6': {
                xp:         65,
                reward:     28
            },
            '1/4': {
                xp:         100,
                reward:     43
            },
            '1/3': {
                xp:         135,
                reward:     57
            },
            '1/2': {
                xp:         200,
                reward:     85
            },
            '1': {
                xp:         400,
                reward:     170
            },
            '2': {
                xp:         600,
                reward:     350
            },
            '3': {
                xp:         800,
                reward:     550
            },
            '4': {
                xp:         1200,
                reward:     750
            },
            '5': {
                xp:         1600,
                reward:     1000
            },
            '6': {
                xp:         2400,
                reward:     1350
            },
            '7': {
                xp:         3200,
                reward:     1750
            },
            '8': {
                xp:         4800,
                reward:     2200
            },
            '9': {
                xp:         6400,
                reward:     2850
            },
            '10': {
                xp:         9600,
                reward:     3650
            },
            '11': {
                xp:         12800,
                reward:     4650
            },
            '12': {
                xp:         19200,
                reward:     6000
            },
            '13': {
                xp:         25600,
                reward:     7750
            },
            '14': {
                xp:         38400,
                reward:     10000
            },
            '15': {
                xp:         51200,
                reward:     13000
            },
            '16': {
                xp:         76800,
                reward:     16500
            },
            '17': {
                xp:         102400,
                reward:     22000
            },
            '18': {
                xp:         153600,
                reward:     28000
            },
            '19': {
                xp:         204800,
                reward:     35000
            },
            '20': {
                xp:         307200,
                reward:     44000
            },
            '21': {
                xp:         409600,
                reward:     51000
            },
            '22': {
                xp:         614400,
                reward:     57000
            },
            '23': {
                xp:         819200,
                reward:     64000
            },
            '24': {
                xp:         1228800,
                reward:     70000
            },
            '25': {
                xp:         1638400,
                reward:     77000
            }
        },

        rewardModifiers: {
            none:           0,
            npcGear:        0.10,
            incidental:     0.5,
            standard:       1.0,
            double:         2.0,
            triple:         3.0
        },

        shopTypes: [
            'blacksmith',
            'apothecary',
            'generalGoods',
            'jeweler',
            'tavern',
            'bookstore',
            'specialty'
        ],

        /* Based on Table: Available Magic Items found http://paizo.com/pathfinderRPG/prd/magicItems.html */
        shopModifiers: {
            trader: {
                baseValue: 200,
                minor: '1d6'
            },
            merchant: {
                baseValue: 1000,
                minor: '3d4',
                medium: '1d6'
            },
            mogul: {
                baseValue: 2000,
                minor: '3d4',
                medium: '2d4',
                major: '1d4'
            },
            baron: {
                baseValue: 8000,
                minor: '4d4',
                medium: '3d4',
                major: '2d4'
            },
            tycoon: {
                baseValue: 16000,
                minor: '8d4',
                medium: '4d4',
                major: '3d4'
            }
        },

        skills: {
            acrobatics: {
                name: 'Acrobatics',
                page: 87
            },
            appraise: {
                name: 'Appraise',
                page: 90
            },
            bluff: {
                name: 'Bluff',
                page: 90
            },
            climb: {
                name: 'Climb',
                page: 90
            },
            craft: {
                name: 'Craft',
                page: 91
            },
            diplomacy: {
                name: 'Diplomacy',
                page: 93
            },
            disableDevice: {
                name: 'Disable Device',
                page: 94
            },
            disguise: {
                name: 'Disguise',
                page: 95
            },
            escapeArtist: {
                name: 'Escape Artist',
                page: 95
            },
            fly: {
                name: 'Fly',
                page: 96
            },
            handleAnimal: {
                name: 'Handle Animal',
                page: 97
            },
            heal: {
                name: 'Heal',
                page: 98
            },
            intimidate: {
                name: 'Intimidate',
                page: 99
            },
            knowledge: {
                name: 'Knowledge (Multiple)',
                page: 99
            },
            linguistics: {
                name: 'Linguistics',
                page: 100
            },
            perception: {
                name: 'Perception',
                page: 102
            },
            perform: {
                name: 'Perform',
                page: 102
            },
            profession: {
                name: 'Profession (Multiple)',
                page: 103
            },
            ride: {
                name: 'Ride',
                page: 103
            },
            senseMotive: {
                name: 'Sense Motive',
                page: 104
            },
            sleightOfHand: {
                name: 'Sleight of Hand',
                page: 104
            },
            spellcraft: {
                name: 'Spellcraft',
                page: 106
            },
            stealth: {
                name: 'Stealth',
                page: 106
            },
            survival: {
                name: 'Survival',
                page: 107
            },
            swim: {
                name: 'Swim',
                page: 108
            },
            useMagicDevice: {
                name: 'Use Magic Device',
                page: 108
            }
        },

        mechanismTypes: [
            'trap',
            'wall',
            'door',
            'caveIn',
            'collapse',
            'flora'
        ],

        xpToLevel: [
            0,
            2000,
            5000,
            9000,
            15000,
            23000,
            35000,
            51000,
            75000,
            105000,
            155000,
            220000,
            315000,
            445000,
            635000,
            890000,
            1300000,
            1800000,
            2550000,
            3600000
        ],

        battleTypes: [
            'minor',
            'major',
            'wandering'
        ]
    },


    getChallengeRatingOptions: function() {
        return this.helpers.buildOptions(this.statics.challengeRatings, false);
    },

    getRewardModifierOptions: function() {
        return this.helpers.buildOptions(this.statics.rewardModifiers, true);
    },

    getShopTypeOptions: function() {
        return this.helpers.buildOptions(this.statics.shopTypes, true);
    },

    getShopModifierOptions: function() {
        return this.helpers.buildOptions(this.statics.shopModifiers, true);
    },

    getShopModifierDetails: function(type) {
        return this.statics.shopModifiers[type];
    },

    getSkillOptions: function() {
        var options = [];

        for (var skill in this.statics.skills) {
            options.push({
                label: this.statics.skills[skill].name,
                value: skill
            });
        }

        return options;
    },

    getMechanismTypeOptions: function() {
        return this.helpers.buildOptions(this.statics.mechanismTypes, true);
    },

    getBattleTypeOptions: function() {
        return this.helpers.buildOptions(this.statics.battleTypes, true);
    },

    getXp: function(cr) {
        return this.statics.challengeRatings[cr].xp;
    },

    getReward: function(cr) {
        return this.statics.challengeRatings[cr].reward;
    },
    
    getRewardModifier: function(mod) {
        return this.statics.rewardModifiers[mod];
    },

    getChallengeRatingByXp: function(xp) {
        var lastCr = null;

        for(var cr in this.statics.challengeRatings) {
            if (this.getXp(cr) > xp) {
                return lastCr;
            }
            lastCr = cr;
        }
    },

    getTreasure: function(cr, mod) {
        var total = this.getReward(cr);

        var modifier = 1.0;
        if (mod) {
            modifier = this.getRewardModifier(mod);
        }
        
        return parseInt(total * modifier);
    },

    getBattleAttrs: function(battlers) {
        var challenge;
        var totalXp = 0;
        var totalCoin = 0;

        _.each(battlers, function(battler) {
            var count = battler.attrs.count;
            var rewardXp = battler.foe.attrs.rewardXp;
            var rewardCoin = battler.foe.attrs.rewardCoin;

            totalXp += parseInt(rewardXp * count);
            totalCoin += parseInt(rewardCoin * count);
        });

        challenge = this.getChallengeRatingByXp(totalXp);

        return {
            challenge: challenge,
            rewardXp: totalXp,
            rewardCoin: totalCoin
        };
    },

    getDayTime: function(segs) {
        if (_.isNaN(parseInt(segs))) {
            segs = 0;
        }

        var days, hours, partial, dayLabel, hourLabel, partialLabel, ampmLabel;

        /*
            Days
         */
        days = parseInt(segs/96);
        segs = segs - (days * 96);
        dayLabel = 'Day ' + (days + 1);

        /*
            Hours
         */
        hours = parseInt(segs/4);

        segs = segs - (hours * 4);
        if (hours === 0) {
            hourLabel = '12';
            ampmLabel = 'AM';
        }
        else if (hours < 12) {
            hourLabel = hours;
            ampmLabel = 'AM';
        }
        else if (hours === 12) {
            hourLabel = '12';
            ampmLabel = 'PM';
        }
        else {
            hourLabel = parseInt(hours-12);
            ampmLabel = 'PM';
        }

        partial = parseInt(segs);
        partialLabel = (partial > 0) ? ':' + (partial * 15) : ':00';

        return (<span>{dayLabel}&nbsp;&nbsp;<small className="text-muted">{hourLabel + partialLabel} {ampmLabel}</small></span>);
    },

    getPartyLevel: function(xp, size) {
        var xpEach = parseInt(xp/size);

        var level = 0;
        _.each(this.statics.xpToLevel, function(xpNeeded) {
            if (xpEach >= xpNeeded) level++;
            else { return false; }
        });

        return level;
    },

    getPartyXp: function(xp, size) {
        var xpEach = parseInt(xp/size);

        var level = this.getPartyLevel(xp, size);

        return (<span>{xp}&nbsp;&nbsp;<small className="text-muted">Level {level} ({xpEach})</small></span>);
    },

    getBattleTime: function(xp, size, cr) {
        var level = this.getPartyLevel(xp, size);
        var challenge = parseInt(cr);

        if (challenge < level) {
            return 0;
        }
        else if (challenge === level) {
            return 1;
        }
        else if (challenge > level) {
            return 1 + (challenge-level);
        }
    },

    getAdjustTimeLabel: function(segs) {
        if (_.isNaN(parseInt(segs))) {
            segs = 0;
        }

        var days, hours, partial;
        var dayLabel, hourLabel, partialLabel = (<span />);

        /*
         Days
         */
        days = parseInt(segs / 96);
        segs = segs - (days * 96);

        /*
         Hours
         */
        hours = parseInt(segs / 4);
        segs = segs - (hours * 4);

        partial = parseInt(segs);

        if (days > 0) {
            dayLabel = (<span>{days} <small>Day{days > 1 ? 's' : ''}</small></span>);
        }

        if (hours > 0) {
            hourLabel = (<span>{days > 0 ? ' ' + hours : hours} <small>Hour{hours > 1 ? 's': ''}</small></span>);
        }

        if (partial > 0) {
            partialLabel = (<span>{hours > 0 ? ' ' + (partial * 15) : (partial * 15)} <small>Mins</small></span>);
        }

        return (<span><span>{dayLabel}</span><span>{hourLabel}</span><span>{partialLabel}</span></span>);
    },

    getTravelDistance: function(source, dest) {
        return Math.abs(source-dest);
    },

    getTravelTime: function(distance, speed) {
        var maxMilesPerDay = 40;

        var days = parseInt(distance/maxMilesPerDay);
        var hours = parseInt((distance%maxMilesPerDay)/speed);

        return (days * 96) + (hours * 4);
    },

    getCarriageCost: function(distance) {
        //Rate @ 1gp per 1 hour
        var segs = this.getTravelTime(distance, 3);

        return parseInt(segs/4);
    }
};

module.exports = Pathfinder;