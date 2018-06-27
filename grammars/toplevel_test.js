var assert = require('assert');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var grammar = require('grammars/toplevel/toplevel.pegjs.js').toplevelGrammar;

function has_error(result) {
  for (var i = 0; i < result.length; i++) {
    if (result[i].hasOwnProperty("kind") &&
        result[i].kind == "error") {
      return true;
    }
  }
  return false;
}

chai.Assertion.addMethod('no_error', function () {
  var result = this._obj;
  console.log(result);
  var num_errors = 0;
  if (result.length === undefined) {
    num_errors = -1;
  } else {
    for (var i = 0; i < result.length; i++) {
      if (result[i].hasOwnProperty("kind") &&
	  result[i].kind == "error") {
	num_errors++;
      }
    }
  }
  this.assert(num_errors == 0,
    // Error message.
    "expected #{this} to have no errors but got #{act} errors (-1 means result was not array-like)",
    // Negated condition error message.
    "expected #{this} to have errors",
    // Expected value.
    0,
    // Actual value.
    num_errors);
})

describe('Grammar', function() {
  it('must not be null', function() {
    expect(grammar).to.be.an('object');
  });

  it('must have parse function', function() {
    expect(grammar).to.have.property('parse');
    expect(grammar.parse).to.a('function');
  });
  
  describe('Source', function() {
    it('should parse a variable', function() {
      var source = 'int x;'
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });

    it('should parse a variable with initializer', function() {
      var source = 'int x = 1;'
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });

    /*
     * These tests fail now.
    it('should parse multiple variables with initializer', function() {
      var source = 'int x = 1, y = 2;'
      var result = grammar.parse(source);
    });
    */

    it('accepts an empty class', function() {
      var source = 'class X {}'
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });

    it('accepts an empty class with a newline', function() {
      var source = 'class X {}\n'
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });

    it('accepts an parametrized class', function() {
      var source = 'class X<T extends java.lang.String> {}\n'
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });

    it('parses array initializer with many newlines', function() {
      var source = 'String[] x = {\n\n"a", \n "b",\n "c"};'
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });

    /* TODO(salikh): fails.
    it('parses array initializer without separator', function() {
      var source = 'int[] x = {0, 1}';
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });
    */

    it('parses array initializer without newlines', function() {
      var source = 'int[] x = {0, 1};';
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });

    it('parses array initializer with newline before end brace', function() {
      var source = 'int[] x = {0, 1\n};'
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });

    it('parses array initializer with newlines and tabs', function() {
      var source = 'String[] x = {\t\t\n\n"a", \n "b",\n "c"};\n'
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });

    it('accepts an function call', function() {
      var source = 'speak("Hello");'
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });

    it('accepts an function call with missing semicolon', function() {
      var source = 'speak("Hello")\n'
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });

    it('accepts an function call with Japanese literal', function() {
      var source = 'speak("こんにちは");'
      var result = grammar.parse(source);
    });

    it('accepts a new array expression', function() {
      var source = 'boolean[] b = new boolean[5];'
      var result = grammar.parse(source);
      expect(result).to.have.no_error();
    });
  });

  describe('ClassBody', function() {
    it('parses empty braces', function() {
      var source = '{}'
      var result = grammar.parse(source, {startRule: "ClassBody"});
    });
  });

  describe('ClassDecl', function() {
    it('parses empty class', function() {
      var source = 'class X {}'
      var result = grammar.parse(source, {startRule: "ClassDecl"});
    });
  });

  describe('Decl', function() {
    it('parses empty class', function() {
      var source = 'class X {}'
      var result = grammar.parse(source, {startRule: "Decl"});
    });

    it('parses array initializer with newlines', function() {
      var source = 'String[] x = {\n"a", \n "b",\n "c"};'
      var result = grammar.parse(source, {startRule: "Decl"});
    });
  });

  describe('VarDecl', function() {
    it('parses array declaration', function() {
      var source = 'String[] x;'
      var result = grammar.parse(source, {startRule: "VarDecl"});
    });
    it('parses array declaration with brackets on var', function() {
      var source = 'String x[];'
      var result = grammar.parse(source, {startRule: "VarDecl"});
    });

    it('parses empty array initializer', function() {
      var source = 'String[] x = {};'
      var result = grammar.parse(source, {startRule: "VarDecl"});
    });

    it('parses array initializer', function() {
      var source = 'String x[] = {"abc"};'
      var result = grammar.parse(source, {startRule: "VarDecl"});
    });

    it('parses array initializer', function() {
      var source = 'String[] x = {"a", "b", "c"};'
      var result = grammar.parse(source, {startRule: "VarDecl"});
    });

    it('parses array initializer with newlines', function() {
      var source = 'String[] x = {\n"a", \n "b",\n "c"};'
      var result = grammar.parse(source, {startRule: "VarDecl"});
    });

    it('does not parses mismatched brace array initializer', function() {
      var source = 'String x[] = {"a", "b", "c"'
      expect(function() {
	var result = grammar.parse(source, {startRule: "VarDecl"});
      }).to.throw(/Expected.*"}"/);
    });
  });

  describe('Statement', function() {
    it('parses function call', function() {
      var source = 'f();'
      var result = grammar.parse(source, {startRule: "Statement"});
    });
  });

  describe('Expression', function() {
    it('parses function call', function() {
      var source = 'f()'
      var result = grammar.parse(source, {startRule: "Expression"});
    });

    it('parses array access', function() {
      var source = 'a[0]'
      var result = grammar.parse(source, {startRule: "Expression"});
    });

    it('parses array access with an index expression', function() {
      var source = 'a[i+1]'
      var result = grammar.parse(source, {startRule: "Expression"});
    });

    it('parses empty array intializer', function() {
      var source = '{}'
      var result = grammar.parse(source, {startRule: "Expression"});
    });

    it('parses array intializer', function() {
      var source = '{"first", "second"}'
      var result = grammar.parse(source, {startRule: "Expression"});
    });

    it('parses new array expression', function() {
      var source = 'new String[3]'
      var result = grammar.parse(source, {startRule: "Expression"});
    });
  });

  describe('Factor', function() {
    it('parses function call', function() {
      var source = 'f()'
      var result = grammar.parse(source, {startRule: "Factor"});
    });

    it('parses empty array initializer', function() {
      var source = '{}'
      var result = grammar.parse(source, {startRule: "Factor"});
    });

    it('parses array initializer', function() {
      var source = '{"abc"}'
      var result = grammar.parse(source, {startRule: "Factor"});
    });

    it('parses array initializer', function() {
      var source = '{"a", "b", "c"}'
      var result = grammar.parse(source, {startRule: "Factor"});
    });

    it('parses array initializer with newlines', function() {
      var source = '{\n"a",\n "b",\n "c"}'
      var result = grammar.parse(source, {startRule: "Factor"});
    });

    it('parses array initializer with newlines', function() {
      var source = '{\n"a", \n "b",\n "c"}'
      var result = grammar.parse(source, {startRule: "Factor"});
    });
    it('does not parses mismatched brace array initializer', function() {
      var source = '{"a", "b", "c"'
      expect(function() {
	var result = grammar.parse(source, {startRule: "Factor"});
      }).to.throw(/Expected.*"}"/);
    });
  });

  describe('QualifiedName', function() {
    it('parses function call', function() {
      var source = 'f'
      var result = grammar.parse(source, {startRule: "QualifiedName"});
    });
  });
});