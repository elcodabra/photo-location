/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import PhotoGalleryComponent from 'components//PhotoGalleryComponent.js';

describe('PhotoGalleryComponent', () => {
    let component;

    beforeEach(() => {
      component = createComponent(PhotoGalleryComponent);
    });

    it('should have its component name as default className', () => {
      expect(component.props.className).to.equal('photogallery-component');
    });
});
