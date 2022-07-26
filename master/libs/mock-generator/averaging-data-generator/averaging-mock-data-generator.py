from random import uniform, randint
from json import dump
from datetime import datetime, timedelta

# Assuming a box-border is used.
# Format : (longitude, latitude)
bounds = [
    (28.235185146331787, -25.752202889891826),  # Top right
    (28.228425979614258, -25.752077267386465),  # Top left
    (28.227782249450684, -25.756155099326918),  # Bottom left
    (28.235281705856323, -25.75700543526357)  # Bottom right
]

# For displaying on geojson.io.
final_js_data = {
    "type": "FeatureCollection",
    "features": []
}

# For .json output files.
average_input_interface = {
    "sensorID": "",
    "coordinates": [],
    "truePoint": {
        "latitude": 0.0,
        "longitude": 0.0,
    }
}


# 1. Generate random point within bounds.
def generate_random_point_within_bounds(b: list) -> tuple:
    t_long, t_lat = b[0]
    b_long, b_lat = b[2]
    longitude: float = uniform(b_long, t_long)
    latitude: float = uniform(b_lat, t_lat)
    final_js_data["features"].append({
        "type": "Feature",
        "properties": {
            "marker-color": "#ff0000",
            "marker-size": "medium",
            "marker-symbol": ""
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                longitude,
                latitude,
            ]
        }
    })

    average_input_interface["sensorID"] = str(randint(0, 255))
    average_input_interface["truePoint"]["latitude"] = latitude
    average_input_interface["truePoint"]["longitude"] = longitude

    return longitude, latitude


# 2. Generate random number of random points near the 'correct' location.
def generate_false_points(point: tuple, number_of_samples: int):
    #points_to_generate = randint(3, 6)
    long, lat = point
    variation_factor = 1000
    deviation_factor = 0.3
    result = []
    timestamps = [(datetime.now() + timedelta(seconds=60 * a)).timestamp() for a in range(number_of_samples)]

    for a in range(number_of_samples):
        longitude = uniform(long * variation_factor, (long * variation_factor) + deviation_factor) / float(
            variation_factor)
        latitude = uniform(lat * variation_factor, (lat * variation_factor) + deviation_factor) / float(
            variation_factor)
        final_js_data["features"].append({
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    longitude,
                    latitude,
                ]
            }
        })
        average_input_interface["coordinates"].append({
            "longitude": longitude,
            "latitude": latitude,
            "timestamp": timestamps.pop()
        })

        result.append((longitude, latitude))


# 3. Prepare output.
def output_data(entry_count):
    outfile = f"reserve_map_{entry_count}.geojson"

    with open(outfile, 'w+') as f:
        dump(final_js_data, f, indent=4)

    final_js_data["features"].clear()

    outfile = f"average_interface_data_{entry_count}.json"

    with open(outfile, 'w+') as f:
        dump(average_input_interface, f, indent=4)

    average_input_interface["coordinates"].clear()


# 4. Helper function to do 1->3.
def generateData(target_sample_count, target_points_per_sample_count):
    for a in range(target_sample_count):
        truePoint = generate_random_point_within_bounds(bounds)
        generate_false_points(truePoint, target_points_per_sample_count)
        output_data(a)


def main():
    try:
        t_sample_count = int(input("# of samples to generate: "))
        t_points_per_sample_count = int(input("# of points per sample to generate: "))
    except:
        print("[-] Exception occured: defaulting to 2 samples of 10 points.")
        t_sample_count = 2
        t_points_per_sample_count = 10

    generateData(t_sample_count, t_points_per_sample_count)


if __name__ == '__main__':
    main()
