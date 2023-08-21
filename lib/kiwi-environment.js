/**
 * environment selector module
 */
'use strict';

function getEnv(key) {
    return process.env[key]
}

/**
 * @example <caption>with NODE_ENV="dev"</caption>
 * inspector() // "dev"
 * 
 * @param  {string[] | undefined} [envs] environment to be tested
 * @returns 
 */
function inspector(...envs) {
    const key = envs[1] ?? 'NODE_ENV';
    const nodeEnv = getEnv(key) ?? 'development'

    if (envs.length === 0) {
        return nodeEnv
    }

    return nodeEnv.toLowerCase() === envs[0].toLowerCase()
}

module.exports = {
    env:inspector,
    _env: function () {
        return process.env.NODE_ENV;
    },
    isDev: function () {
        return !!(this._env() &&
            (/dev/i).test(this._env())) || !this._env();
    },
    isNotDev: function () {
        return !this.isDev();
    },
    isTest: function () {
        return !!(this._env() &&
            (/test/i).test(this._env()));
    },
    isNotTest: function () {
        return !this.isTest();
    },
    isStage: function () {
        return !!(this._env() &&
            ((/stag/i).test(this._env()) || (/qa/i).test(this._env())));
    },
    isNotStage: function () {
        return !this.isStage();
    },
    isQA: function () {
        return this.isStage();
    },
    isNotQA: function () {
        return this.isNotStage();
    },
    isProd: function () {
        return !!(this._env() &&
            ((/live/i).test(this._env()) || (/prod/i).test(this._env())));
    },
    isNotProd: function () {
        return !this.isProd();
    }
};
