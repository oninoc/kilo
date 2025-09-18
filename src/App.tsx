import { QueryProvider } from './shared/providers/QueryProvider'
import { FilterProvider, useFilters } from './shared/contexts/FilterContext'
import { ZoneSelect } from './shared/components/ZoneSelect'
import { AwardsList } from './pages/award/components/AwardsList'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import Button from './components/ui/button'
import { Toaster } from './components/ui/toaster'
import { toast } from './hooks/useToast'
import './App.css'

function AppContent() {
  const { filters, setZoneId, setDate, clearFilters } = useFilters();

  const handleZoneChange = (value: string) => {
    setZoneId(value)
  }

  const validateDate = (dateString: string): boolean => {
    if (!dateString) return true;
    
    const date = new Date(dateString);
    const now = new Date();
    const minDate = new Date('2000-01-01');
    const maxDate = new Date();
    maxDate.setFullYear(now.getFullYear() + 1);
    
    if (isNaN(date.getTime())) {
      return false;
    }
    
    if (date < minDate || date > maxDate) {
      return false;
    }
    
    return true;
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    
    if (validateDate(newDate)) {
      setDate(newDate);
      if (newDate) {
        const formattedDate = new Date(newDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        toast({
          variant: "success",
          title: "Valid Date Selected",
          description: `Date: ${formattedDate}`,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Date",
        description: "Please enter a valid date between 2000 and next year",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Kilo Challenge
            </h1>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zone-select">Zone</Label>
                  <ZoneSelect 
                    value={filters.zoneId} 
                    onValueChange={handleZoneChange}
                    placeholder="Choose a zone..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-input">Date Entry (YYYY-MM-DD)</Label>
                  <Input
                    id="date-input"
                    type="date"
                    value={filters.date}
                    onChange={handleDateChange}
                    placeholder="Select date..."
                    min="2000-01-01"
                    max="2020-12-31"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Awards</h2>
              <AwardsList />
            </div>
          </div>
        </main>
        <Toaster />
      </div>
  )
}

function App() {
  return (
    <QueryProvider>
      <FilterProvider>
        <AppContent />
      </FilterProvider>
    </QueryProvider>
  )
}

export default App
