import assert from "assert";
const pkg = require('../package.json')

const versionUtilisee = parseFloat(process.version.slice(1));
const versionMinimale = parseFloat(pkg.engines.node);
const messageDErreur = `Version de nodejs utilisée : ${versionUtilisee}, demandée : ${versionMinimale}`;
assert.ok(versionMinimale <= versionUtilisee, messageDErreur);
