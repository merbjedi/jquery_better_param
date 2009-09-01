module("ajax");
test("jQuery.param()", function() {
	expect(6);
	var params = {foo:"bar", baz:42, quux:"All your base are belong to us"};
	equals( jQuery.param(params), "foo=bar&baz=42&quux=All+your+base+are+belong+to+us", "simple" );

	params = {someName: [1, 2, 3], regularThing: "blah" };
	equals( jQuery.param(params), "someName=1&someName=2&someName=3&regularThing=blah", "with array" );

	params = {"foo[]":["baz", 42, "All your base are belong to us"]};
	equals( jQuery.param(params), "foo%5B%5D=baz&foo%5B%5D=42&foo%5B%5D=All+your+base+are+belong+to+us", "more array" );

	params = {"foo[bar]":"baz", "foo[beep]":42, "foo[quux]":"All your base are belong to us"};
	equals( jQuery.param(params), "foo%5Bbar%5D=baz&foo%5Bbeep%5D=42&foo%5Bquux%5D=All+your+base+are+belong+to+us", "even more arrays" );

	params = {"foo": {bar: "baz", beep: 42, quux: "All your base are belong to us"}};
	equals( jQuery.param(params), "foo%5Bbar%5D=baz&foo%5Bbeep%5D=42&foo%5Bquux%5D=All+your+base+are+belong+to+us", "nested objects" );

	params = {"foo": [{bar: "baz", beep: 42}, {bar: "baz2", beep: 43}]};
	equals( jQuery.param(params), "foo%5Bbar%5D=baz&foo%5Bbeep%5D=42&foo%5Bbar%5D=baz2&foo%5Bbeep%5D=43", "nested array of objects" );
});