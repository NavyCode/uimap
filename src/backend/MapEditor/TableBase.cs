using System.ComponentModel.DataAnnotations.Schema;

namespace TestPlanService
{
    public class TableBase
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public bool IsDeleted { get; set; }

        public void Deactivate()
        {
            IsDeleted = true;
        }
    }
}