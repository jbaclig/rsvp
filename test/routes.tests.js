const expect = require('chai').expect;
const request = require('request');

describe('Routes', function() {
    it('sets RSVP to true', function(done) {
        request.put(
            'http://localhost:5000/rsvp/1/attending/true',
            function(error, response, body) {
                expect(response.statusCode).that.equal(200);
                request.get(
                    'http://localhost:5000/id/1',
                    function(error, response, body) {
                        expect(JSON.parse(body).rows[0]).to.deep.equal({
                            title: 'Mr.',
                            first_name: 'Crispin',
                            last_name: 'Baclig',
                            group_num: 1,
                            allow_guest: false,
                            attending: true,
                            guest_attending: null
                        });
                        done();
                    }
                );
            }
        );
    });

    it('sets RSVP to false', function(done) {
        request.put(
            'http://localhost:5000/rsvp/1/attending/false',
            function(error, response, body) {
                expect(response.statusCode).that.equal(200);
                request.get(
                    'http://localhost:5000/id/1',
                    function(error, response, body) {
                        expect(JSON.parse(body).rows[0]).to.deep.equal({
                            title: 'Mr.',
                            first_name: 'Crispin',
                            last_name: 'Baclig',
                            group_num: 1,
                            allow_guest: false,
                            attending: false,
                            guest_attending: null
                        });
                        done();
                    }
                );
            }
        );
    });

    it('sets RSVP with guest to true', function(done) {
        request.put(
            'http://localhost:5000/rsvp/37/attending/true/guest/true',
            function(error, response, body) {
                expect(response.statusCode).to.equal(200);

                request.get (
                    'http://localhost:5000/find/Camille/Fritsch',
                    function(error, response, body) {
                        expect(JSON.parse(body).rows[0]).to.deep.equal({
                            title: 'Mr.',
                            first_name: 'Camille',
                            last_name: 'Fritsch',
                            group_num: 19,
                            allow_guest: true,
                            attending: true,
                            guest_attending: true
                        });
                        done();
                    }
                );
            }
        );
    });

    it('sets RSVP with guest to false', function(done) {
        request.put(
            'http://localhost:5000/rsvp/37/attending/false/guest/false',
            function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                request.get (
                    'http://localhost:5000/find/Camille/Fritsch',
                    function(error, response, body) {
                        expect(JSON.parse(body).rows[0]).to.deep.equal({
                            title: 'Mr.',
                            first_name: 'Camille',
                            last_name: 'Fritsch',
                            group_num: 19,
                            allow_guest: true,
                            attending: false,
                            guest_attending: false
                        });
                        done();
                    }
                );
            }
        );
        
    });
});

