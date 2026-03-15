try {
  const aiReact = require('ai/react');
  console.log("ai/react exists:");
  console.log(Object.keys(aiReact));
} catch (e) {
  console.log("ai/react missing", e.message);
}

try {
  const sdkReact = require('@ai-sdk/react');
  console.log("@ai-sdk/react exists:");
  console.log(Object.keys(sdkReact));
} catch (e) {
  console.log("@ai-sdk/react missing", e.message);
}
