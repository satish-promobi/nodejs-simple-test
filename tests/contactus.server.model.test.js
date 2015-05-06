'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    ContactUs = mongoose.model('ContactUs');

var contactUs;

describe('ContactUs Model unit test:', function(){
    beforeEach(function(done){
        contactUs = new ContactUs({
            name: 'test',
            email: 'test@email.com',
            subject: 'this is test',
            message: 'save successfully'
        });
    });
});

describe('Save method', function(){
    it('should be able to save without errors', function(done){
        return contactUs.save(function(err){
            should.not.exist(err);
            done();
        });
    });

    it('should be able to show error when try to save without valid value', function(done){
        contactUs.name = '';
        contactUs.email = '@!!@sd';
        contactUs.subject = '';
        contactUs.message = '';
        return contactUs.save(function(err){
            should.exist(err);
            done();
        });
    });
});