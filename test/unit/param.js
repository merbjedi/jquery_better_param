module("param");
test("base jQuery.param() tests", function() {
  expect(4);

  ////////////////
  var params = {foo:"bar", baz:42, quux:"All your base are belong to us"};
  equals( jQuery.param(params), "foo=bar&baz=42&quux=All+your+base+are+belong+to+us", "simple" );
  // "foo=bar&baz=42&quux=All+your+base+are+belong+to+us"

  // Ruby Verification
  // Rack::Utils.parse_nested_query("foo=bar&baz=42&quux=All+your+base+are+belong+to+us")
  // #=> {"quux"=>"All your base are belong to us", "baz"=>"42", "foo"=>"bar"}

  ////////////////
  params = {someName: [1, 2, 3], regularThing: "blah" };
  equals( jQuery.param(params), "someName=1&someName=2&someName=3&regularThing=blah", "with array" );
  // "someName=1&someName=2&someName=3&regularThing=blah"

  // Ruby Verification
  // Rack::Utils.parse_nested_query("someName=1&someName=2&someName=3&regularThing=blah")
  // #=> {"someName"=>"3", "regularThing"=>"blah"}

  ////////////////
  params = {"foo[]":["baz", 42, "All your base are belong to us"]};
  equals( jQuery.param(params), "foo%5B%5D=baz&foo%5B%5D=42&foo%5B%5D=All+your+base+are+belong+to+us", "more array" );
  // "foo[]=baz&foo[]=42&foo[]=All+your+base+are+belong+to+us"

  // Ruby Verification
  // Rack::Utils.parse_nested_query("foo%5B%5D=baz&foo%5B%5D=42&foo%5B%5D=All+your+base+are+belong+to+us")
  // #=> {"foo"=>["baz", "42", "All your base are belong to us"]}
  
  ////////////////
  params = {"foo[bar]":"baz", "foo[beep]":42, "foo[quux]":"All your base are belong to us"};
  equals( jQuery.param(params), "foo%5Bbar%5D=baz&foo%5Bbeep%5D=42&foo%5Bquux%5D=All+your+base+are+belong+to+us", "even more arrays" );
  // "foo[bar]=baz&foo[beep]=42&foo[quux]=All+your+base+are+belong+to+us"

  // Ruby Verification
  // Rack::Utils.parse_nested_query("foo%5Bbar%5D=baz&foo%5Bbeep%5D=42&foo%5Bquux%5D=All+your+base+are+belong+to+us")
  // #=> {"foo"=>{"quux"=>"All your base are belong to us", "beep"=>"42", "bar"=>"baz"}}
});

test("nested jQuery.param() tests", function() {
  ////////////////
  params = {"foo": {bar: "baz", beep: 42, quux: "All your base are belong to us"}};
  equals( jQuery.param(params), "foo%5Bbar%5D=baz&foo%5Bbeep%5D=42&foo%5Bquux%5D=All+your+base+are+belong+to+us", "nested objects" );
  // "foo[bar]=baz&foo[beep]=42&foo[quux]=All+your+base+are+belong+to+us"

  // Ruby verification:
  // Rack::Utils.parse_nested_query("foo%5Bbar%5D=baz&foo%5Bbeep%5D=42&foo%5Bquux%5D=All+your+base+are+belong+to+us")
  // #=> {"foo"=>{"quux"=>"All your base are belong to us", "beep"=>"42", "bar"=>"baz"}}

  ////////////////
  params = {"foo": [{bar: "baz", beep: 42}, {bar: "baz2", beep: 43}]};
  equals( jQuery.param(params), "foo%5Bbar%5D=baz&foo%5Bbeep%5D=42&foo%5Bbar%5D=baz2&foo%5Bbeep%5D=43", "nested array of objects" );
  // "foo[bar]=baz&foo[beep]=42&foo[bar]=baz2&foo[beep]=43"

  // Ruby verification:
  // Rack::Utils.parse_nested_query("foo%5Bbar%5D=baz&foo%5Bbeep%5D=42&foo%5Bbar%5D=baz2&foo%5Bbeep%5D=43")
  // #=> {"foo"=>{"beep"=>"43", "bar"=>"baz2"}}
});

test("super nested jQuery.param() tests", function() {
  ////////////////
  params = {"foo": {bar: "baz", beep: 42, quux: "All your base are belong to us"}};
  equals( jQuery.param(params), "foo%5Bbar%5D=baz&foo%5Bbeep%5D=42&foo%5Bquux%5D=All+your+base+are+belong+to+us", "nested objects" );
  // "foo[bar]=baz&foo[beep]=42&foo[quux]=All+your+base+are+belong+to+us"

  // Ruby verification:
  // Rack::Utils.parse_nested_query("foo%5Bbar%5D=baz&foo%5Bbeep%5D=42&foo%5Bquux%5D=All+your+base+are+belong+to+us")
  // #=> {"foo"=>{"quux"=>"All your base are belong to us", "beep"=>"42", "bar"=>"baz"}}

  ////////////////
  params = {"foo": {beep: {beep2: {beep3: {beep4: "BEEEEEP"}}}}};
  equals( jQuery.param(params), "foo%5Bbeep%5D%5Bbeep2%5D%5Bbeep3%5D%5Bbeep4%5D=BEEEEEP", "very far nested object" );
  // "foo[beep][beep2][beep3][beep4]=BEEEEEP"

  // Ruby verification:
  // Rack::Utils.parse_nested_query("foo%5Bbeep%5D%5Bbeep2%5D%5Bbeep3%5D%5Bbeep4%5D=BEEEEEP")
  // #=> {"foo"=>{"beep"=>{"beep2"=>{"beep3"=>{"beep4"=>"BEEEEEP"}}}}}
});

test("super duper nested jQuery.param() test", function(){
  ////////////////
  params = {"person": 
              {
                name: "Joe Blow", 
                address: "51 Westinghouse Ave", 
                "categories[]": [
                  {id: 1, name: "cat1"}, 
                  {id: 2, name: "cat2"}
                ]
              }
            };

  // PARTS:
  // person[name]=Joe+Blow
  // &person[address]=51+Westinhouse+Ave
  // &person[categories][][id]=1
  // &person[categories][][name]=cat1
  // &person[categories][][id]=2
  // &person[categories][][name]=cat2
  
  equals( jQuery.param(params), "person%5Bname%5D=Joe+Blow&person%5Baddress%5D=51+Westinhouse+Ave&person%5Bcategories%5D%5B%5D%5Bid%5D=1&person%5Bcategories%5D%5B%5D%5Bname%5D=cat1&person%5Bcategories%5D%5B%5D%5Bid%5D=2&person%5Bcategories%5D%5B%5D%5Bname%5D=cat2", "deep nested object collections");
  // "person[name]=Joe+Blow&person[address]=51+Westinhouse+Ave&person[categories][][id]=1&person[categories][][name]=cat1&person[categories][][id]=2&person[categories][][name]=cat2"

  // Ruby verification
  // Rack::Utils.parse_nested_query "person%5Bname%5D=Joe+Blow&person%5Baddress%5D=51+Westinhouse+Ave&person%5Bcategories%5D%5B%5D%5Bid%5D=1&person%5Bcategories%5D%5B%5D%5Bname%5D=cat1&person%5Bcategories%5D%5B%5D%5Bid%5D=2&person%5Bcategories%5D%5B%5D%5Bname%5D=cat2"
  // #=> {"person"=>{"address"=>"51 Westinhouse Ave", "name"=>"Joe Blow", "categories"=>[{"name"=>"cat1", "id"=>"1"}, {"name"=>"cat2", "id"=>"2"}]}}
  
});