/*!
 * Copyright 2002 - 2015 Webdetails, a Pentaho company. All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

define(['cdf/Dashboard.Clean', 'cde/components/ExportButtonComponent', 'cdf/lib/jquery'],
  function(Dashboard, ExportButtonComponent, $) {

  /**
   * ## The Export Button Component
   */
  describe("The Export Button Component #", function() {
    var dashboard = new Dashboard();

    dashboard.init();

    var exportButtonComponent = new ExportButtonComponent({
      type: "ExportButtonComponent",
      name: "expButton1",
      executeAtStart: true,
      htmlObject: "sampleObject",
      priority: 5,
      label: "TestExport",
      componentName: "",
      parameters: [],
      outputType: "csv",
      listeners: []
    });

    dashboard.addComponent(exportButtonComponent);

    // inject sampleObject div
    $htmlObject = $('<div>').attr('id', exportButtonComponent.htmlObject);

    /**
     * ## The Export Button Component # allows a dashboard to execute update
     */
    it("allows a dashboard to execute update", function(done) {
      $('body').append($htmlObject);

      spyOn(exportButtonComponent, 'update').and.callThrough();

      // listen to cdf:postExecution event
      exportButtonComponent.once("cdf:postExecution", function() {
        expect(exportButtonComponent.update).toHaveBeenCalled();
        $htmlObject.remove();
        done();
      });

      dashboard.update(exportButtonComponent);
    });
  });
});
