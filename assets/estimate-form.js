/* Progressive enhancement: native POST remains the submission path. */
(function(root){
  'use strict';
  var services = {"hardwood-installation":"Hardwood Installation","engineered-hardwood":"Engineered Hardwood","flooring-replacement":"Flooring Replacement","tile-installation":"Tile Installation","bathroom-remodeling":"Bathroom Remodeling","shower-remodeling":"Shower Remodeling","refinishing":"Sand & Finish","lvp-laminate":"LVP / Laminate","stairs-trim":"Stairs & Trim","floor-preparation":"Floor Preparation & Repairs"};
  var cities = {"johns-creek":"Johns Creek","alpharetta":"Alpharetta","roswell":"Roswell","milton":"Milton","cumming":"Cumming","sandy-springs":"Sandy Springs","buckhead":"Buckhead, Atlanta","marietta":"Marietta","kennesaw":"Kennesaw","atlanta":"Atlanta"};
  function selectedValue(map, key) {
    return Object.prototype.hasOwnProperty.call(map, key) ? map[key] : '';
  }
  function emailRequired(preference) { return /^Email(?:\s|$)/.test(preference || ''); }
  function photoError(files) {
    if (!files || files.length === 0) return '';
    if (files.length > 1) return 'Please choose one project photo.';
    var file = files[0];
    if (!['image/jpeg','image/png','image/webp'].includes(file.type)) return 'Choose a JPG, PNG or WebP photo, or remove it and send your request without a photo.';
    if (file.size > 5000000) return 'Choose a photo smaller than 5 MB, or remove it and send your request without a photo.';
    return '';
  }
  function init(form, params) {
    var field = function(name) { return form.querySelector('[name="' + name + '"]'); };
    var service = field('service'), city = field('city');
    if (service && !service.value) service.value = selectedValue(services, params.get('service'));
    if (city && !city.value) city.value = selectedValue(cities, params.get('city'));
    var email = field('email'), preference = field('contact-preference'), photo = field('project-photos');
    var feedback = form.querySelector('#form-feedback');
    function validate() {
      if (email && preference) email.required = emailRequired(preference.value);
      var message = photoError(photo && photo.files);
      if (photo) photo.setCustomValidity(message);
      if (feedback) feedback.textContent = message;
      return !message;
    }
    if (preference) preference.addEventListener('change', validate);
    if (photo) photo.addEventListener('change', validate);
    form.addEventListener('submit', function(event) {
      validate();
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
      }
    }, true);
    // Re-evaluate restored browser values after back/forward navigation.
    if (root.addEventListener) root.addEventListener('pageshow', validate);
    validate();
  }
  root.ChivvEstimate = {selectedValue:selectedValue, emailRequired:emailRequired, photoError:photoError, init:init, services:services, cities:cities};
  if (root.document) root.document.addEventListener('DOMContentLoaded', function() {
    var form = root.document.querySelector('form[name="estimate-request"]');
    if (form) init(form, new root.URLSearchParams(root.location.search));
  });
})(typeof window !== 'undefined' ? window : globalThis);
