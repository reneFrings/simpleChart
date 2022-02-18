/**
 * Jedes Formular mit Kennzahlen soll jeweils für sich überprüft werden, ob seine Felder die richtigen Werte enthält.
 * Entsprechend sollen die "Speichern" Button je Formular aktiv/inaktiv gesetzt werden
 * Dafür muss ich wissen, aus welchem Formular die Felder mit der Klasse "check" geprüft werden sollen
 * 
 * Ich möchte nur das Objekt aufrufen müssen und die Klasse und den die Kriterien als Parameter übergeben, auf die diese Felder
 * überprüft werden sollen. Habe ich aber unterschiedliche Felder die auf unterschiedliche Kriterien überprüft werden sollen,
 * müsste ich immer das Objekt aufrufen. Besser wäre also wenn man obj.funktion(pm) aufrufen kann.
 * 
 * Parameter die übergeben werden sollen
 * Formular Feld, z.B. input
 * Formular Typ, z.B. text
 * Klasse, jedes Feld mit dieser Klasse soll überprüft werden
 * Kriterium, Z.B. Zahl, Text. Dann werden die entsprechenden Felder geprüft, ob sie eine Zahl oder Text enthalten
 * 
 * Jedem neuen Formular muss ich einem datasets Element zurordnen. Gibt es zb. 3 Formulare und das 2. wird gelöscht, müssen die 
 * Daten weiter zugeordnet bleiben.
 * 
 */




$( document ).ready(function() {

    var isChartRendered = false;

/**
 * Chart Instanz
 */

    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: []
        },
        options: {
            animation: {
                onComplete: function() {
                   isChartRendered = true
                }
            },
            responsive: true,
            // aspectRatio: 2,
            // maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },   
            legend: {
                display: true,
                padding: 40,
                position: 'top',
                align: 'center',
                labels: {
                    fontColor: 'rgb(51, 51, 51)',
                    usePointStyle: true,
                    // padding: 24
                },
            },                 
            title: {
                display: true,
                text: 'Chart Titel',
                fontSize: 24,
                fontColor: 'rgb(51, 51, 51)'	
            },    
            scales: {
                xAxes: [{
                    // offset: true,
                    ticks: {
                        beginAtZero: true,
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    
    console.log('myChart: ', myChart.data.datasets);


/**
 * Im Portrait Modus das Chart skalieren
 */

    if(window.innerHeight > window.innerWidth){
        // console.log('Portrait');
        myChart.options.maintainAspectRatio = false;
        myChart.canvas.parentNode.style.height = window.innerWidth + 'px';
        myChart.canvas.parentNode.style.width = '100%';
        myChart.update();
    }



/**
 * "Klasse", um Formular Felder prüfen 
 */

    const myFormData = new formData();


/**
 * Diagramm Titel speichern
 */

    $('#save_chart_title').click(function(){
            
        // Input Text Wert speichern
        let get_field_values = $('#chart_title').val(); 

        // Input Text Wert als Titel einfügen
        myChart.options.title.text = get_field_values;

        // Chart aktualisieren
        myChart.update();

    });

/**
 * Festgelegte Daten (Objekte), die in myChart.data.datasets[] eingefügt werden
 */

    var formDatasets = 
        {
            form_data_1:
                {
                    label: 'Kennzahl 1',
                    data: [],
                    backgroundColor: 'rgba(56, 97, 143, 0.2)',
                    borderColor: 'rgba(56, 97, 143, 1)',
                    borderWidth: 1,
                    name: 'form_data_1'
                },
            form_data_2:
                {
                    label: 'Kennzahl 2',
                    data: [],
                    backgroundColor: 'rgba(255, 103, 69, 0.2)',
                    borderColor: 'rgba(255, 103, 69, 1)',
                    borderWidth: 1,
                    name: 'form_data_2'
                },
            form_data_3:
                {
                    label: 'Kennzahl 3',
                    data: [],
                    backgroundColor: 'rgba(253, 151, 53, 0.2)',
                    borderColor: 'rgba(253, 151, 53, 1)',
                    borderWidth: 1,
                    name: 'form_data_3'
                }
        };

/**
 * Zu Beginn, den ersten Datensatz ins Chart Objekt hinzufügen
 */

    updateChartObj('form_data_1');

/**
 * myChart.data.datasets[] neue Daten hinzufügen
 */
    
    function updateChartObj(obj){

        // Objekt aus formDatasets{} myChart.data.datasets[] als Array Element hinzufügen
        myChart.data.datasets.push(formDatasets[obj]);

        // myChart aktualisieren
        myChart.update();
    }
    
/**
 * Funktion - Kennzahlen Formular hinzufügen
 */    
    function addForm(formId, no){

        // HTML Code für das Kennzahlen Formular 
        let formCode = '\
            <form id="'+formId+'">\
                <div class="key_figure_box"><span>Kennzahl #'+no+'</span></div>\
                <ul class="data">\
                    <li class="key_figure_title_box">\
                        <label for="key_figure_title">Titel</label>\
                        <input type="text" class="key_figure_title" name="key_figure_title" title="Bezeichnung der Kennzahl" value="Kennzahl #'+no+'">\
                    </li>\
                    <li class="k1">\
                        <label for="q1">Q1</label>\
                        <input class="dimension" type="text" name="q1" title="Wert für Q1 eintragen">\
                    </li>\
                    <li class="k2">\
                        <label for="q2">Q2</label>\
                        <input class="dimension" type="text" name="q2" title="Wert für Q2 eintragen">\
                    </li>\
                    <li class="k3">\
                        <label for="q3">Q3</label>\
                        <input class="dimension" type="text" name="q3" title="Wert für Q3 eintragen">\
                    </li>\
                    <li class="k4">\
                        <label for="q4">Q4</label>\
                        <input class="dimension" type="text" name="q4" title="Wert für Q4 eintragen">\
                    </li>\
                    <li class="button_group">\
                        <button type="button" class="add_data_button" title="Werte für Kennzahl ins Chart einfügen">\
                            <img src="img/save-file-option.svg" alt="Werte für Kennzahl ins Chart einfügen">\
                        </button>\
                        <button type="reset" class="del_data_button" title="Alle Werte für diese Kennzahl löschen">\
                            <img src="img/trash.svg" alt="Alle Werte für diese Kennzahl löschen">\
                        </button>\
                        <button type="button" class="del_figure_button" title="Kennzahl komplett entfernen">\
                            <img src="img/remove-symbol.svg" alt="Kennzahl komplett entfernen">\
                        </button>\
                    </li>\
                </ul>\
            </form>';


        // HTML Code nach dem letzen <form> im DOM einfügen
        $('form:last').after(formCode);

        // Sobald alle 3 Formulare im DOM vorhanden sind
        let countForms = $('section > form').length;
        if(countForms === 3){
            // Soll der Button nicht mehr angezeigt werden
            $('button#add_form').css({'display':'none'});
        }

    }

/**
 * Button - Formular hinzufügen
 */    

    $('button#add_form').click(function(){

        // Wenn Element mit ID #form_data_2 nicht existiert
        if($('#form_data_2').length === 0){

            // Fügt ein Formular ins DOM
            addForm('form_data_2', '2');

            // Fügt dem Chart Objekt Daten hinzu
            updateChartObj('form_data_2');

        // Wenn Element mit ID #form_data_3 nicht existiert
        } else if($('#form_data_3').length === 0){
            addForm('form_data_3', '3');
            updateChartObj('form_data_3');
        }
        // Wenn alle Elemente existieren
        else{
            // Hinweis einblenden
            alert('Es können max. 3 Kennzahlen erstellt werden!');
        }

    });


/**
 * Button - Formular löschen
 */    
    $('body').on('click', 'button.del_figure_button', function(){

        // Aktive Formular aus DOM löschen
        $(this).parents('form').remove(); 

        // Id aus myChart.data.datasets[] speichern
        let findItem = getId($(this).parents('form'));

        // Element aus myChart.data.datasets[] löschen - Indexzähler wird mit splice() aktualiert
        myChart.data.datasets.splice(findItem,1);

        // myChart aktualisieren
        myChart.update();

        // Sobald alle 3 Formulare im DOM vorhanden sind
        let countForms = $('section > form').length;
        if(countForms < 3){
            // Soll der Button nicht mehr angezeigt werden
            $('button#add_form').css({'display':'block'});
        }


    });

/**
 * Button - Formular Daten löschen
 */    
    $('body').on('click', 'button.del_data_button', function(){

        let getForm = $(this).parents('form'); 

        // Id aus myChart.data.datasets[] speichern
        let findItem = getId(getForm);

        // label in Standardwert ändern "Kennzahl {1,2,3}"
        myChart.data.datasets[findItem].label = 'Kennzahl ' + (parseInt(findItem) + 1);

        // Reitername des Formulars in Standardwert ändern "Kennzahl #1"
        $(getForm).find('.key_figure_box > span').text('Kennzahl #'+(parseInt(findItem) + 1));

        // data löschen
        myChart.data.datasets[findItem].data = [];

        // Alle Fehler Klassen und Meldungen entfernen
        myFormData.removeErrors($(this));

        // myChart aktualisieren
        myChart.update();

    });


/**
 * Id aus Chart Objekt.data.datasets[] anhand des aktiven Formulars erhalten
 * Wo in myChart.data.datasets[] ist das Objekt, was z.B. name: 'form_data_2' enthält
 * Wird name: 'form_data_2' im 1. Objekt (Array Element) gefunden, wäre das Ergebnis 0
 */
    function getId(form){

        // #Id des aktiven Formulars
        let getFormId = form.attr('id');
        //console.log('getFormId', getFormId);

        // Im Chart Objekt.data.datasets[] in den Array Elementen (Objekte) nach key:value suchen und die ID des Array Elements erhalten, z.B. name: 'form_data_2'
        let findItem = myChart.data.datasets.findIndex(x => x.name === getFormId);

        // Wert zurückgeben
        return findItem;
    }



/**
 * Werte aus den Datenfelder dem Chart Objekt übergeben
 */

    $('body').on('click', 'button.add_data_button', function(){        

        let result = myFormData.checkAllData('dimension',$(this));

        if(result === 'valid'){

            console.log('Die Daten sind valide!');

            // Aktive Formular speichern
            let getForm = $(this).parents('form'); 

            // Kennzahl Titel speichern - Wert aus Textfeld ".key_figure" speichern
            let getKeyFigureValue = $(getForm).find('.key_figure_title').val(); 
            $(getForm).find('.key_figure_box > span').text(getKeyFigureValue);

            // console.log('getForm: ', getForm[0]['id']); // form_data_2

            // Id aus myChart.data.datasets[] speichern
            let findItem = getId(getForm);

            // Input Text Wert als label einfügen
            myChart.data.datasets[findItem].label = getKeyFigureValue;

            // Kennzahlen aus dem Formular speichern
            let get_field_values = $(getForm).find('input.dimension').serializeArray(); 

            // Array leeren, damit es max. 4 Werte enthält
            myChart.data.datasets[findItem].data = [];

            // Kennzahlen aus dem Formular myChart.data.datasets[].data[] hinzufügen
            $.each(get_field_values, function( i, field ) {
                // Wert Array hinzufügen
                myChart.data.datasets[findItem].data.push(parseInt(field.value));
            });

            // myChart aktualisieren
            myChart.update();

            console.log('myChart: ', myChart.data.datasets);
        
        }
        else{
            console.log('Die Daten enthalten Fehler!');
        }

    });


/**
 * Chart Typ wählen
 */
    
    // // Line 
    //  $('#line_chart').click(function(){
    //     myChart.config.type = 'line';
    //     myChart.update();
    //     console.log('Line Chart');
    //  });

    //  // Bar
    //  $('#bar_chart').click(function(){
    //     // myChart.clear();
    //     myChart.config.type = 'bar';
    //     myChart.update();
    //     console.log('Bar Chart');
    //  });



/**
 * Funktion - Formular Daten prüfen
 **
 * Nach der Änderung werden alle Feldwerte geprüft
 * Gibt es keinen Fehler, wird der Button auf aktiv gesetzt, ansonsten nicht
 * Gleichzeitig, werden alle Felder bei Fehlern formatiert
 */

    function formData(){

        /**
         * Funktion prüft, ob der Parameter vom Typ Integer ist oder nicht
         */

            let checkIsInteger = function(val){
                // Prüft, ob ein Parameter eine ganze Zahl ist.
                if (Number.isInteger(val)) {
                    // console.log('Eine Zahl: ', val);
                    return 'valid';
                // Wenn es keine ganze Zahl ist
                } else {
                    // console.log('Keine Zahl: ', val);
                    return 'error';
                }
            }

        /**
         * Alle Fehler Klassen und Nachricht löschen, weil erneut geprüft wird
         */                

            this.removeErrors = function(thisElement){

                let getForm = thisElement.parents('form');

                // Error Klasse aus Input Feldern löschen, falls vorhanden
                let foundErrorClass = getForm.find('ul.data > li > input.error');
                if(foundErrorClass){
                    // console.log('remove error');
                    foundErrorClass.removeClass( "error" );
                }

                // Error Message löschen, falls vorhanden
                let foundErrorMsg = getForm.find('div.error_msg');
                if(foundErrorMsg){
                    // console.log('remove error msg');
                    foundErrorMsg.remove();
                }
            }


        /**
         * Funktion, die auf Änderungen in den <input> Feldern mit der übergebenen Klasse reagiert 
         */
            this.checkAllData = function(checkClass,thisElement){

                console.log('checkAllData()', thisElement);
                
            /**
             * Das aktive Formular speichern
             */                

                // Selektor speichern - alle input Felder die die Klasse (Parameter: checkClass) enthalten
                let checkSelector = ':input.' + checkClass;
                
                // Ermittelt das Formular, in welchem sich das geänderte input Feld befindet (falls es mehrere Formulare gibt)
                let getForm = thisElement.parents('form'); 

                console.log('getForm: ', getForm);

                // löschen
                this.removeErrors(thisElement);

            /**
             * Werte aus Formularfeldern prüfen
             */                

                // Speichert alle Textfelder und Werte der selektierten Felder in einem Array
                let get_field_values = $(getForm).find(checkSelector).serializeArray(); 
                console.log('get_field_values', get_field_values);

                // Status aller Felder zu Beginn auf "ok" setzen
                let state = 'ok';

                /**
                 * Alle Feldwerte aus dem Array werden geprüft
                 */
                    $.each(get_field_values, function( i, field ) {

                        // Wert aus dem aktuellen Textfeld - Kommas in Punkte umwandeln. Kein Wert = 0
                        let val = (field.value == '') ? '0' : field.value.replace(',', '.');

                        // Wandelt "String Zahlen" (auch Dezimal Zahlen) in Integer um. 
                        val = parseFloat(val);
                        console.log('val: ', val);
                        result = checkIsInteger(val);

                        // console.log('field.name: ', field.name);
                        // console.log('input i: ', $(getForm).find('input[name="'+i+'"]'));

                        // Gibt es einen Fehler wird dieser gespeichert
                        if(result === 'error'){
                            $(getForm).find('input[name="'+field.name+'"]').addClass( "error" );
                            state = 'error';
                        }

                    });


                /**
                 * Wenn nur ein Feld einen Fehler hat
                 */
                    if (state === 'error'){
                        thisElement.parents('ul').prepend('<div class="error_msg">Bitte nur ganze Zahlen eingeben!</div>');
                        return 'error';
                    }
                        
                    // Sind alle Feldwerte ok
                    if(state === 'ok'){
                        return 'valid';
                    }

            }

    }

/**
 * Screenshot vom Chart erstellen 
 */    
    $('#make_screenshot').click(function(){
        console.log('start');

        /* Verhindert, dass das Bild abgeschnitten angezeigt wird */
        $(window).scrollTop(0);
        
        // Wenn das Chart nicht gerendert ist
        if (!isChartRendered){
            return; 
        }
        else{
            console.log('isChartRendered: ', isChartRendered);
            html2canvas(document.getElementById('chart_box'), {
                // width: 300,
                // height: 200
            }).then(function(canvas){   
                console.log('html2canvas');
                let link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg');
                link.download = 'myChart.jpeg';
                link.click();             
            });
        }
    });


});


