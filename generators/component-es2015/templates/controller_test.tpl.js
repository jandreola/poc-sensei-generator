import controller from '../controller';

const props = {};
let ctrl;

function createInstance() {
	return new controller(props);
}


describe('<%= componentName %> controller', function () {
	before(function () {
		ctrl = createInstance();
	});

	describe('method name', function () {
		it('should...', function () {
			assert.isOk(false);
		});
	});

	after(function () {});
});
