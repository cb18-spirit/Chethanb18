import time

class TrafficLight:
    def __init__(self):
        self.state = 'red' 

    def change_state(self, new_state):
        assert new_state in ['red', 'yellow', 'green'], f"Invalid state: {new_state}. Must be 'red', 'yellow', or 'green'."
        self.state = new_state
        print(f"Traffic light is now {self.state}")

    def run_cycle(self):
        while True:
            self.change_state('red')
            time.sleep(5)  

            self.change_state('green')
            time.sleep(5) 

            self.change_state('yellow')
            time.sleep(2) 

if __name__ == "__main__":
    traffic_light = TrafficLight()
    traffic_light.run_cycle()
