"use strict";(self.webpackChunkconfig_manager=self.webpackChunkconfig_manager||[]).push([[4527],{2257:function(e){function n(e){!function(e){var n={pattern:/^[;#].*/m,greedy:!0},t=/"(?:[^\r\n"\\]|\\(?:[^\r]|\r\n?))*"(?!\S)/.source;e.languages.systemd={comment:n,section:{pattern:/^\[[^\n\r\[\]]*\](?=[ \t]*$)/m,greedy:!0,inside:{punctuation:/^\[|\]$/,"section-name":{pattern:/[\s\S]+/,alias:"selector"}}},key:{pattern:/^[^\s=]+(?=[ \t]*=)/m,greedy:!0,alias:"attr-name"},value:{pattern:RegExp(/(=[ \t]*(?!\s))/.source+"(?:"+t+'|(?=[^"\r\n]))(?:'+/[^\s\\]/.source+'|[ \t]+(?:(?![ \t"])|'+t+")|"+/\\[\r\n]+(?:[#;].*[\r\n]+)*(?![#;])/.source+")*"),lookbehind:!0,greedy:!0,alias:"attr-value",inside:{comment:n,quoted:{pattern:RegExp(/(^|\s)/.source+t),lookbehind:!0,greedy:!0},punctuation:/\\$/m,boolean:{pattern:/^(?:false|no|off|on|true|yes)$/,greedy:!0}}},punctuation:/=/}}(e)}e.exports=n,n.displayName="systemd",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_systemd.d2f85c08.chunk.js.map