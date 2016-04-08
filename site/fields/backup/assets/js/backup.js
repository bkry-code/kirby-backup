(function($)
{
  $(document).ready(function()
  {
    if(app && typeof app == 'object')
    {
      $(app.main).on('view:load', function()
      {

        $(document).on('click','.clear-list',function()
        {
          $('.fileList').css('visibility','hidden');
          $('#backupList ul').hide();
        });

       $(document).on('click','#backupList a',function()
        {
          $('.fileList').css('visibility','hidden');
          $('#backupList ul').fadeIn();
        });

        /* ---------------------------------------------- */
        /* check for existing backups */
        /* ---------------------------------------------- */

        $.ajax({
          url  : '../content-backup/',
          type : 'POST',
          data : ({action:'check'}),
        }).done(function(data)
        {
          $('#backupStatus').html(data);
        });

        /* ---------------------------------------------- */
        /* delete any existing backups */
        /* ---------------------------------------------- */

        $(document).on('click','#deleteBackup',function()
        {
          $.ajax({
            url  : '../content-backup/',
            type : 'POST',
            data : ({action:'delete'}),
          }).done(function(data)
          {
            $('#backupStatus').html(data);
          });
        });

        /* ---------------------------------------------- */
        /* create new backup */
        /* ---------------------------------------------- */

        $("#createBackup").click(function()
        {
          $('#createBackup, #creatingBackup').toggleClass('btn-show');
          $('#backupStatus ul').html('<li>Generating a new backup.</li><li>Please, be patient.</li>');

          $.ajax({
            url  : '../content-backup/',
            type : 'POST',
            data : ({action:'create'}),
          }).done(function(data)
          {
            $('#createBackup, #creatingBackup').toggleClass('btn-show');
            $('#backupStatus').html(data);
          });
        });

        /* ---------------------------------------------- */

      });
    }
  });
})(jQuery);
